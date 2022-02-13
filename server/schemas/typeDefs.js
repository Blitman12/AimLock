const {gql} = require('apollo-server-express')

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String,
        games: [Game]!
    }

    type Game {
        _id: ID
        gameName: String
        mouseDPI: String
        mouseSensitivity: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        game(username: String!): [Game]
        games: [Game]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        deleteUser(_id: ID!): User
        addGame(gameName: String!, mouseDPI: String!, mouseSensitivity: String!): Game
        removeGame(gameId: ID!, userId: ID!): Game
    }
`

module.exports = typeDefs