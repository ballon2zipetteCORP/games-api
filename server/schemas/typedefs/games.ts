import gql from "graphql-tag";

const gameInterface = `
    id: ID
    displayName: String
    createdAt: Date

    minPlayers: Int
    maxPlayers: Int
`

export default gql`
    
    interface Game {
        ${gameInterface}
    }

    type Wereworlf implements Game {
        ${gameInterface}
        roles: [WerewolfRole!]
    }

    type WerewolfRole {
        id: ID
        displayName: String
        image: String
        description: String
        expectedActions: [String!] 
    }

    extend type Query {
        games: [Game!]
        game(id: ID!): Game
    }

`