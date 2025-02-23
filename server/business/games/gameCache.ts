import BaseGame from "./BaseGame";

const gameCache = new Map<string, BaseGame>();

class GameCacheError extends Error {
    constructor(message: string) {
        super();
        this.message = `[GameCacheError] ${message}`;
    }
}

const retrieve = (partyId: string): BaseGame => {
    return gameCache.get(partyId)! ?? null;
}

const del = (partyId: string): void => {
    if(!gameCache.has(partyId)) {
        return;
    }
    gameCache.delete(partyId);
}

const store = (partyId: string, game: BaseGame): void => {
    if(gameCache.has(partyId)) {
        throw new GameCacheError("Game already stored in cache.");
    }
    gameCache.set(partyId, game);
}

export default {
    retrieve,
    del,
    store
}