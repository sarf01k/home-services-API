const mongoose = require("mongoose");
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },
    requestDate: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    additionalInfo: {
        type: String
    }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;