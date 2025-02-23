import BaseGame, { IBaseGameParams } from "./BaseGame";

interface IRole {
    id: string;
    displayName: string
    image: string
    description: string
    expectedActions: [string] 
}

interface IWerewolfMetadata {
    roles: IRole[]
}

interface IWerewolfSettings {
    NUMBER_OF_PLAYER_PER_ROLE: Record<string, number>;
}

export default class WerewolfGame extends BaseGame {

    public constructor({ party, game }: IBaseGameParams) {
        super({ party, game });
    }

    public end(): void {
        super.end();
    }

    public start(): void {
        super.start();
        this.distributeRoles();
        // TODO: game start
    }

    private distributeRoles(): void {
        const players = this.party.players;
        const settings = this.party.settings as IWerewolfSettings;
        const metadata = this.game.metadata as IWerewolfMetadata;

        const rolesSettings = Object.entries(settings?.NUMBER_OF_PLAYER_PER_ROLE ?? {});
        for(const player of players) {
            const index = Math.floor(Math.random() * rolesSettings.length) % rolesSettings.length;
            const [id, quota] = rolesSettings[index];
            const role = metadata.roles.find(r => r.id === id)!;

            // TODO: send message to the player
            
            const newQuota = quota-1;
            rolesSettings[index][1] = newQuota;
            if(newQuota < 1) {
                rolesSettings.splice(index, 1);
            }
        }
    }

}