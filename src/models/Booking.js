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
        default: Date.now,
        required: true
    },
    startTime: {
        type: String,
        enum: [
            "7:00 AM",
            "7:30 AM",
            "8:00 AM",
            "8:30 AM",
            "9:00 AM",
            "9:30 AM",
            "10:00 AM",
            "10:30 AM",
            "11:00 AM",
            "11:30 AM",
            "12:00 PM",
            "12:30 PM",
            "1:00 PM",
            "1:30 PM",
            "2:00 PM",
            "2:30 PM",
            "3:00 PM",
            "3:30 PM",
            "4:00 PM",
            "4:30 PM",
            "5:00 PM",
            "5:30 PM",
            "6:00 PM",
            "6:30 PM",
            "7:00 PM",
            "7:30 PM",
            "8:00 PM",
            "8:30 PM",
            "9:00 PM",
            "9:30 PM",
            "10:00 PM"
        ],
		default: "10:00 AM",
    },
    duration: {
        type: String,
		enum: ["2 hours", "3 hours", "4 hours", "5 hours", "6 hours", "7 hours", "8 hours", "9 hours", "10 hours", "11 hours", "12 hours"],
		default: "2 hours",
    },
    jobDescription: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    // bookingPrice is requestedService.price * duration
    bookingPrice: {
        type: Number,
    }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;