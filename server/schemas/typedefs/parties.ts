import gql from "graphql-tag";

export default gql`

    type Party {
        id: ID!
        owner: PartyPlayer
        players: [PartyPlayer!]
        game: Game
        settings: JSON
        status: String
    }

    type PartyPlayer {
        id: ID
        displayName: String
    }

    extend type Query {
        party(id: ID!): Party
    }

    extend type Mutation {
        createParty(gameId: ID!): Party @requireMe
        startParty(id: ID!): Party @requireMe
        joinParty(id: ID!): Party @requireMe
        leaveParty(id: ID!): Party @requireMe
        savePartySettings(id: ID!, settings: JSON!): Party @requireMe
    }

`