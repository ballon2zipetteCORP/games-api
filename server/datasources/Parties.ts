import client from "../services/redis"
import {v4 as uuid} from "uuid";
import { IMe } from "../types";

export interface IPartyPlayer {
    id: string;
    displayName: string;
}

export interface IParty {
    id: string;
    ownerId: string;
    players: IPartyPlayer[];
    gameId: string;
}

export default class Parties {

    readonly TAG = "parties:";

    public async get(id: string): Promise<IParty> {
        const party = await client.get(this.TAG+id);
        return party ? JSON.parse(party) : null;
    }

    public async create(gameId: string, displayName: string) {
        const player: IPartyPlayer = {
            displayName,
            id: uuid()
        }

        return this.set({
            id: uuid(),
            gameId,
            ownerId: player.id,
            players: [player]
        });
    }

    public async leave(id: string, playerId: string) {
        const party = await this.get(id);
        const players = [...party.players];
        let ownerId = party.ownerId;

        // remove the player from the list
        const player = players.find(p => p.id === playerId);
        players.splice(players.indexOf(player!), 1);
        
        // special case for owner
        if(ownerId === playerId) {
            // change the owner with the first player
            ownerId = players[0].id;
        }

        return this.update(id, { ownerId, players });
    }

    public async join(id: string, me: IMe) {
        const party = await this.get(id);
        const players = [...party.players];
        players.push({ 
            id: me.id, 
            displayName: me.displayName 
        });

        return this.update(id, { players });
    }

    private async update(id: string, props: Omit<Partial<IParty>, "id">) {
        const party = await this.get(id);
        if(!party) {
            throw new Error("Party not found");
        }
        return this.set({ ...party, ...props });
    }

    private async set(party: Partial<IParty>) {
        await client.set(this.TAG+party.id, JSON.stringify(party), { EX: 60*60*24 });
        return party;
    }

}