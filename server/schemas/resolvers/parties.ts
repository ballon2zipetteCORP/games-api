import { GraphQLError } from "graphql";
import { IContext } from "../../types";
import gameCache from "../../business/games/gameCache";
import { GameStatus } from "../../business/games/BaseGame";

export default {
    Party: {
        game: ({gameId}: any, _:any, {dataSources}: IContext) => {
            return dataSources.games.get(gameId)
        },
        owner: ({ownerId, players}: any) => {
            return players.find((player:any) => player.id === ownerId);
        },
        status: ({id}:any) => {
            const party = gameCache.retrieve(id);
            return party ? party.getStatus() : GameStatus.UNKNOWN;
        }
    },
    Query: {
        party: (_:any, {id}: {id: string}, {dataSources}: IContext) => {
            return dataSources.parties.get(id)
        }
    },
    Mutation: {
        createParty: (_:any, {gameId}: {gameId: string}, {dataSources, me}: IContext) => {
            return dataSources.parties.create(gameId, me!)
        },
        leaveParty: (_:any, {id}: {id: string}, {dataSources, me}: IContext) => {
            return dataSources.parties.leave(id, me?.id!)
        },
        joinParty: (_:any, {id}: {id: string}, {dataSources, me}: IContext) => {
            return dataSources.parties.join(id, me!)
        },
        savePartySettings: async (_:any, {id, settings}: {id: string;settings: any}, { dataSources, me }: IContext) => {
            const party = await dataSources.parties.get(id);
            if(!party) throw new GraphQLError("Party not found.", { extensions: { code: "BAD_USER_INPUT" } });
            if(party.ownerId !== me?.id) {
                throw new GraphQLError("You need to be the party owner to save settings", { extensions: { code: "FORBIDDEN" } });
            }
            return dataSources.parties.saveSettings(id, settings);
        },
        startParty: async (_:any, {id}: {id: string}, { dataSources, me }: IContext) => {
            const party = await dataSources.parties.get(id);
            if(!party) throw new GraphQLError("Party not found.", { extensions: { code: "BAD_USER_INPUT" } });
            if(party.ownerId !== me?.id) {
                throw new GraphQLError("You need to be the party owner to save settings", { extensions: { code: "FORBIDDEN" } });
            }
            gameCache.retrieve(id).start();
            return party;
        }
    }
}