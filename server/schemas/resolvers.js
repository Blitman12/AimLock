const { AuthenticationError } = require('apollo-server-express');
const { User, Game } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (_, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).populate('games')

                return userData
            }
            throw new AuthenticationError('Not Logged In')
        },
        users: async () => {
            return User.find().populate('games')
        },
        user: async (_, { username }) => {
            return User.findOne({ username }).populate('games')
        },
        games: async () => {
            return Game.find()
        },
        game: async (_, {_id}) => {
            return Game.findById(_id)
        }
    },

    Mutation: {
        addUser: async (_, { username, password, email }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user)

            return { user, token }
        },

        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email')
            }

            const correctPassword = await user.isCorrectPassword(password)

            if (!correctPassword) {
                throw new AuthenticationError('Incorrect Credentials')
            }

            const token = signToken(user)
            return { token, user }
        },

        deleteUser: async (_, { _id }, context) => {
            const user = await User.findById(_id)
            
            if (!user) {
                throw new AuthenticationError('No user found with this ID')
            }

            if (context.user) {
                if (_id === context.user._id) {
                    const user = await User.findById(context.user._id)
                    const deletedGames = await Game.deleteMany({_id: {$in: user.games}})
                    const deletedUser = await User.findByIdAndDelete(context.user._id)
                    return {deletedGames, deletedUser}
                }
                throw new AuthenticationError('a mismatch occurred, please log in and try again');
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        addGame: async (_, { gameName, mouseDPI, mouseSensitivity }, context) => {
            if (context.user) {
                const game = await Game.create({ gameName, mouseDPI, mouseSensitivity })

                const user = await User.findByIdAndUpdate(context.user._id, { $addToSet: { games: game._id } }, {new: true})

                return {game, user}
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        removeGame: async (_, {gameId, userId}, context) => {
            if (context.user._id === userId) {
                const game = Game.findById(gameId)
                if(!game) {
                    throw new AuthenticationError('No game found with this ID')
                }
                return Game.findByIdAndDelete(gameId)
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        updateGame: async (_, {gameId, mouseDPI, mouseSensitivity, userId}, context) => {
            if (context.user._id === userId) {
                const game = Game.findById(gameId)
                if (!game) {
                    throw new AuthenticationError('No game found with this ID')
                }
                return Game.findByIdAndUpdate(gameId, {mouseDPI, mouseSensitivity}, {new: true})
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
}


module.exports = resolvers;