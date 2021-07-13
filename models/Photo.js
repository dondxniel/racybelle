const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
    driveId : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Photo', PhotoSchema)