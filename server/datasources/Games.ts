import { models } from "../models";

export default class Games {

    public async getAll() {
        const games = await models.game.find({}).lean();
        return games.map(({metadata, ...r}) => ({
            ...metadata, ...r
        }))
    }

    public async get(id: string) {
        const game = await models.game.findOne({ id });
        if(!game) return null;
        const { metadata, ...r }: any = game.toObject();
        return {...metadata, ...r}
    }

}