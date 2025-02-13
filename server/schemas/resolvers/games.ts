import { IGame } from "../../models/game";
import { IContext } from "../../types";

export default {
    Game: {
        __resolveType(obj: IGame) {
            return obj.object ?? null;
        }
    },
    Query: {
        games: (_:any, __:any, {dataSources}: IContext) => {
            return dataSources.games.getAll()
        },
        game: (_:any, {id}: {id: string}, {dataSources}: IContext) => {
            return dataSources.games.get(id)
        }
    }
}