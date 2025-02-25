import { IParty } from "../../datasources/Parties";
import { IGame } from "../../models/game";
import { webSocketConnections } from "../../services/websocket";

export class GameError extends Error {
    constructor(message: string) {
        super(`[Game error] ${message}`)
    }
}

export enum GameStatus {
    WAITING_FOR_PLAYERS = "WAITING_FOR_PLAYERS",
    READY = "READY",
    IN_PROGRESS = "IN_PROGRESS",
    ENDED = "ENDED",
    IN_ERROR = "IN_ERROR",
    UNKNOWN = "UNKNOWN"
}

export interface IBaseGameParams {
    party: IParty;
    game: IGame;
}

export interface IMessage<T={}> {
    type: string;
    data?: T
}

export default abstract class BaseGame {

    protected party: IParty;
    protected game: IGame;
    private status: GameStatus;

    public constructor({party, game}: IBaseGameParams) {
        this.party = party;
        this.game = game;
        this.status = GameStatus.UNKNOWN;

        this.updateStatus();
    }
    
    /**
     * Update the current game object with the new party data
     * @param party the new party object
     */
    public update(party: IParty): void {
        this.party = party;
        this.updateStatus();
    }

    /**
     * Determine the game status based on criterias.
     */
    public getStatus(): GameStatus {
        return this.status;
    }

    /**
     * Start a game. Will send a message to all party players
     */
    public start(): void {
        if(this.getStatus() !== GameStatus.READY) {
            throw new GameError("Game is not ready, actual status: " + this.getStatus());
        }
        this.status = GameStatus.IN_PROGRESS;
        this.broadcast({ type: "GAME_STARTED", data: { status: this.status } });
    }
    
    /**
     * End a game. Will send a message to all party players
     */
    public end(): void {
        if(this.getStatus() !== GameStatus.IN_PROGRESS) {
            throw new GameError("Game is not in progress, actual status: " + this.getStatus());
        }
        this.status = GameStatus.ENDED;
        this.broadcast({ type: "GAME_ENDED", data: { status: this.status } });
    }

    /**
     * Broadcast a message to all party players.
     */
    public broadcast<T>(message: IMessage<T>): void {
        this.party.players.forEach(p => this.sendMessage(p.id, message));
    }

    /**
     * Send a message to a specific player
     */
    protected sendMessage<T>(playerId: string, message: IMessage<T>): void {
        const playerWs = webSocketConnections[playerId];
        if(!playerWs) return;
        playerWs?.send(JSON.stringify({
            ...message,
            gameId: this.game.id,
            sentAt: new Date()
        }));
    }

    private updateStatus(): void {
        this.status = GameStatus.WAITING_FOR_PLAYERS;
        if(this.party.players.length >= this.game.minPlayers) {
            this.status = GameStatus.READY;
        }
    }

}