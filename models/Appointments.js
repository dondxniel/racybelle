const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AppointmentsSchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    phoneNumber : {
        type : String,
        required : true,
        trim : true
    },
    appointmentDate : {
        type : String,
        required : true,
        trim : true
    },
    appointmentTime : {
        type : String,
        required : true,
        trim : true
    },
    // These two values will be set automatically.
    dateBooked: {
        type: Date,
        default: Date.now
    },
    seen : {
        type : Boolean,
        default : false
    }
})
// This is how getter and setter methods are set in mongoose
// get dateBooked() {
//     return this._dateBooked;
// },
// set dateBooked(value) {
//     this._dateBooked = value;
// },
module.exports = mongoose.model('Appointments', AppointmentsSchema);
