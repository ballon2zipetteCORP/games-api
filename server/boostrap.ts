import express, {Express} from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";

import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServer } from "@apollo/server";
import {buildSubgraphSchema} from "@apollo/subgraph";

import tokenService from "./business/tokenService";

import { IDataSourcesParams, IDataSources } from "./types";
import { applyMeDirective } from "./business/directives/requiresMeDirective";

const app = express();
const httpServer = http.createServer(app);

app.use(cors());
app.use(express.json({ limit: '50mb' }));

interface IParams {
    init?: () => Promise<void>;
    schema: any;
    dataSources: ({ language }: IDataSourcesParams) => IDataSources;
    routes?: (app: Express) => void;
}

async function boostrap({ init, schema, dataSources, routes }: IParams) {
    schema = buildSubgraphSchema(schema);

    const server = new ApolloServer({
        schema: applyMeDirective(schema),
        csrfPrevention: true,
        cache: "bounded",
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer })
        ]
    });

    await server.start()
    await mongoose.connect(process.env.MONGO_URI!)

    if(init) {
        await init();
    }

    app.use("/graphql",
        expressMiddleware(server, {
            context: async ({req}: any) => {
                const authorization = req.headers?.authorization || "";
                const language = req.language || "fr";
                const me = await tokenService.unserialize(authorization);
    
                return {
                    language,
                    authorization,
                    me,
                    dataSources: dataSources({ language })
                }
            }
        })
    );

    if(routes) {
        routes(app);
    }
    
    const port = 8080;
    httpServer.listen({port});

    console.log(`🚀  Server ready at http://localhost:${port}/graphql`);
}

export { boostrap }