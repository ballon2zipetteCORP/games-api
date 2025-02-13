import {boostrap} from "./boostrap";
import { Games, Parties } from "./datasources";
import schema from "./schemas/index";

boostrap({
    schema,
    dataSources: () => {
        return {
            games: new Games(),
            parties: new Parties()
        }
    }
}).catch(console.error)