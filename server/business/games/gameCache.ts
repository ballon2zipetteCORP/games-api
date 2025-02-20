import BaseGame from "./BaseGame";

const gameCache = new Map<string, BaseGame>();

class GameCacheError extends Error {
    constructor(message: string) {
        super();
        this.message = `[GameCacheError] ${message}`;
    }
}

const retrieveGame = (partyId: string): BaseGame => {
    if(!gameCache.has(partyId)) {
        throw new GameCacheError("No game were found, please store in cache first.");
    }
    return gameCache.get(partyId)!;
}

const storeGame = (partyId: string, game: BaseGame): void => {
    if(gameCache.has(partyId)) {
        throw new GameCacheError("Game already stored in cache.");
    }
    gameCache.set(partyId, game);
}

export default {
    retrieveGame,
    storeGame
}