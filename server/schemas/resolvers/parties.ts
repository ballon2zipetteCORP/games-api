import { IContext } from "../../types";

export default {
    Party: {
        game: ({gameId}: any, _:any, {dataSources}: IContext) => {
            return dataSources.games.get(gameId)
        },
        owner: ({ownerId, players}: any) => {
            return players.find((player:any) => player.id === ownerId);
        }
    },
    Query: {
        party: (_:any, {id}: {id: string}, {dataSources}: IContext) => {
            return dataSources.parties.get(id)
        }
    },
    Mutation: {
        createParty: (_:any, {gameId, displayName}: {gameId: string, displayName: string}, {dataSources}: IContext) => {
            return dataSources.parties.create(gameId, displayName)
        },
        leaveParty: (_:any, {id}: {id: string}, {dataSources, me}: IContext) => {
            return dataSources.parties.leave(id, me?.id!)
        },
        joinParty: (_:any, {id}: {id: string}, {dataSources, me}: IContext) => {
            return dataSources.parties.join(id, me!)
        }
    }
}