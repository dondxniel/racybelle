const express = require('express');
const router = express.Router();
const Appointments = require('../models/Appointments');
const auth = require('../middleware/auth');

// Route to book appointment
router.post('/book-appointment', (req, res) => {
    const { name, email, phoneNumber, appointmentDate, appointmentTime } = req.body;

    const ap = new Appointments({ name, email, phoneNumber, appointmentDate, appointmentTime });
    ap.save()
    .then(ap => {
        res.json({
            success: true,
            data: ap
        })
    })
    .catch(err => {
        res.json({
            success: false,
            message: process.env.SAVE_ERROR,
            error: err
        })
    })
})

// Route to fetch all bookings
router.get('/fetch-bookings/:page/:amountToFetch',  auth, (req, res) => {
    let { page, amountToFetch } = req.params;
    page = parseInt(page);
    amountToFetch = parseInt(amountToFetch);
    const skip= amountToFetch * page; // The page uses an indexing system where page 1 returns 0.
    const limit = amountToFetch;

    Appointments.find({})
    .sort({dateBooked: -1})
    .skip(skip)
    .limit(limit)
    .then(aps => {
        res.json({
            success: true,
            data: aps
        })
    })
    .catch(err => {
        res.json({
            success: false,
            message: process.env.FETCH_ERROR,
            data: err
        })
    })
})

// Fetch all booked dates 
router.get('/fetch-booked-dates', (req, res) => {

    Appointments.find({}, 'appointmentDate appointmentTime -_id')
    .then(dates => {
        res.json({
            success: true,
            data: dates
        })
    })
    .catch(err => {
        res.json({
            success: false,
            message: process.env.FETCH_DATES_ERROR,
            data: err
        })
    })
})
module.exports = router;