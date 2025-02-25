import { Games, Parties } from "./datasources/index";

export interface IContext {
    language: string;
    authorization: string;
    me: IMe|null;
    dataSources: IDataSources;
}

export interface IDataSources {
    games: Games;
    parties: Parties;
}

export interface IDataSourcesParams {
    language: string;
}

export interface IMe {
    id: string;
    displayName: string;
}