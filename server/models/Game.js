const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    gameName: {
        type: String,
        required: 'You must have a game name',
        minLength: 2,
        maxLength: 75,
        trim: true
    },
    mouseDPI: {
        type: String,
        required: 'Must input a DPI',
        trim: true
    },
    mouseSensitivity: {
        type: String,
        required: 'Must input mouse sens',
        trim: true
    }
})

const Game = model('Game', gameSchema);

module.exports = Game;
