import {Schema, default as mongoose} from "mongoose";
import {v4 as uuid} from "uuid";

export interface IGame {
    id: string;
    object: string;
    displayName: string;
    createdAt: Date;
    minPlayers: number;
    maxPlayers: number;
    metadata: Record<string, unknown>;
}

const schema = new Schema<IGame>({
    id: { type: String, required: true, index: true, unique: true, default: uuid },
    object: { type: String, required: true },
    displayName: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    minPlayers: { type: Number, required: true },
    maxPlayers: { type: Number },
    metadata: { type: JSON }
});

export default mongoose.model("games", schema);