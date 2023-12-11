const Booking = require("../models/Booking")

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()

        return res.status(200).json({
            success: true,
            bookinga: bookings
        })
    } catch (error) {
        console.error(`Error:\n${error}`);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

exports.getBooking = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        return res.status(200).json({
            success: true,
            booking: booking
        })
    } catch (error) {
        console.error(`Error:\n${error}`);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

exports.createBooking = async (req, res) => {
    const { serviceId, date, time, additionalInfo } = req.body;
    const newBooking = new Booking({ serviceId, date, time, additionalInfo });

    try {
        const savedBooking = await newBooking.save();

        return res.status(200).json({
            success: true,
            booking: savedBooking
        })
    } catch (error) {
        console.error(`Error:\n${error}`);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

exports.updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { date, time, additionalInfo } = req.body;

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { date, time, additionalInfo },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(401).json({ message: 'Booking not found' });
        }

        return res.status(200).json({
            success: true,
            updatedBooking: updatedBooking
        })
    } catch (error) {
        console.error(`Error:\n${error}`);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

exports.deleteBooking = async (req, res) => {
    const { bookingId } = req.params

    try {
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);

        if (!deletedBooking) {
            return res.status(401).json({ message: 'Booking not found' });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted"
        })
    } catch (error) {
        console.error(`Error:\n${error}`);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}