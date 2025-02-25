import { WebSocketExpress } from "websocket-express";
import {boostrap} from "./boostrap";
import { Games, Parties } from "./datasources";
import schema from "./schemas/index";
import websocket from "./services/websocket";

boostrap({
    schema,
    routes: (app: WebSocketExpress) => {
        app.ws("/ws/:id", websocket);
    },
    dataSources: () => {
        return {
            games: new Games(),
            parties: new Parties()
        }
    }
}).catch(console.error)