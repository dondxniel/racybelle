const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MiscSchema = new Schema({
    contactInfo : {
        type : String,
        default: ''
    },
    aboutInfo : {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('Misc', MiscSchema);
