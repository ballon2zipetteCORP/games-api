import gql from "graphql-tag";

export default gql`

    type Party {
        id: ID!
        owner: PartyPlayer
        players: [PartyPlayer!]
        game: Game
        settings: JSON
    }

    type PartyPlayer {
        id: ID
        displayName: String
    }

    extend type Query {
        party(id: ID!): Party
    }

    extend type Mutation {
        createParty(gameId: ID!, displayName: String!): Party @requireMe
        joinParty(id: ID!, displayName: String!): Party @requireMe
        leaveParty(id: ID!): Party @requireMe
    }

`