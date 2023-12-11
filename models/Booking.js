const mongoose = require('mongoose');
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },
    requestDate: {
        type: Date,
        default: Date.now
    },
    startDate: {
        type: Date
    },
    startTime: {
        type: Date
    },
    additionalInfo: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed'],
        default: 'pending'
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;