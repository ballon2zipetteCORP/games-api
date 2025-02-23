import tokenService from "../../business/tokenService";
import {v4 as uuid} from "uuid";
import { IContext } from "../../types";
import { GraphQLError } from "graphql";

export default {
    Mutation: {
        createIdentity: async (_:any, {displayName}: {displayName: string}, {me}: IContext) => {
            if(me) {
                throw new GraphQLError("You already have an identity", {
                    extensions: {
                        code: "FORBIDDEN"
                    }
                });
            }
            return tokenService.serialize({
                displayName,
                id: uuid()
            });
        }
    }
}