import gameCache from "../business/games/gameCache";
import WerewolfGame from "../business/games/WerewolfGame";
import { models } from "../models/index";
import client from "../services/redis";
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
  settings: unknown;
  createdAt: Date;
}

const GameMapper: any = {
  werewolf: WerewolfGame,
};

export default class Parties {
  readonly TAG = "parties:";

  public async get(id: string): Promise<IParty> {
    const party = await client.get(this.TAG + id);
    return party ? JSON.parse(party) : null;
  }

  public async create(gameId: string, me: IMe) {
    const player: IPartyPlayer = me;
    const game = await models.game.findOne({ id: gameId });

    const GameClass = GameMapper[gameId];
    const partyId = this.generatePartyID();

    const party = await this.set({
      id: partyId,
      gameId,
      ownerId: player.id,
      players: [player],
      settings: {},
      createdAt: new Date(),
    });

    // store game instance in an object
    gameCache.store(partyId, new GameClass({ party, game }));

    return party;
  }

  public async leave(id: string, playerId: string) {
    const party = await this.get(id);
    const players = [...party.players];
    let ownerId = party.ownerId;

    // remove the player from the list
    const player = players.find((p) => p.id === playerId);
    players.splice(players.indexOf(player!), 1);

    // special case for owner
    if (ownerId === playerId && players.length) {
      // change the owner with the first player
      ownerId = players[0].id;
    }

    await this.update(id, { players });
    const cachedGame = gameCache.retrieve(id);

    cachedGame.broadcast<{ player: IPartyPlayer }>({
      type: "PLAYER_LEAVED",
      data: { player: player! },
    });

    return this.update(id, { ownerId, players });
  }

  public async saveSettings(id: string, settings: Record<string, unknown>) {
    return this.update(id, { settings });
  }

  public async join(id: string, me: IMe) {
    const party = await this.get(id);
    if (!party) throw new Error("Party not found.");
    const players = [...party.players];
    const player = { id: me.id, displayName: me.displayName };

    players.push(player);

    const updatedParty = await this.update(id, { players });
    const cachedGame = gameCache.retrieve(id);

    cachedGame.broadcast<{ player: IPartyPlayer }>({
      type: "PLAYER_JOINED",
      data: { player },
    });
    return updatedParty;
  }

  private async update(id: string, props: Omit<Partial<IParty>, "id">) {
    const party = await this.get(id);
    if (!party) {
      throw new Error("Party not found");
    }
    const updatedParty = await this.set({ ...party, ...props });
    const cachedGame = gameCache.retrieve(id);

    cachedGame?.update(updatedParty as IParty);
    return updatedParty;
  }

  private async set(party: Partial<IParty>) {
    await client.set(this.TAG + party.id, JSON.stringify(party), {
      EX: 60 * 60 * 24,
    });
    return party;
  }

  private generatePartyID() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";

    for (let i = 0; i < 6; i++) {
      result += letters[Math.floor(Math.random() * letters.length)];
    }
    return result;
  }
}
