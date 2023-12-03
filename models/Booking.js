const mongoose = require('mongoose');
const Schema = mongoose.Schema

const bookingSchema = Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    requestDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed'],
        default: 'pending'
    },
    workerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker'
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    crewSize: {
        type: Number, default: 1
    },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;