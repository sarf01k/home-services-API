const Booking = require("../models/Booking");
const Service = require("../models/Service");

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()

        return res.status(200).json({
            success: true,
            bookings: bookings
        })
    } catch (error) {
        console.error(`Error:\n${error}`);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

exports.getBookings = async (req, res) => {
    const user = req.user.existingUser
    try {
        const bookings = await Booking.find({ userId: user._id })

        return res.status(200).json({
            success: true,
            bookings: bookings
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

const timeStringToMinutes = (timeString) => {
    const [time, ampm] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);

    const adjustedHours = ampm === 'PM' && hours !== 12 ? hours + 12 : hours;

    return adjustedHours * 60 + minutes;
};

exports.createBooking = async (req, res) => {
    const user = req.user.existingUser
    const { serviceId, address, startDate, startTime, duration, jobDescription, phoneNumber } = req.body;
    const requestedService = await Service.findById(serviceId)
    const newBooking = new Booking({ userId: user._id, serviceId, address, startDate, startTime, duration, jobDescription, phoneNumber, price: `$${requestedService.price}/hr` });

    try {
        const totalMinutes = timeStringToMinutes(startTime) + parseInt(duration) * 60;
        if (totalMinutes > (22 * 60)) {
            return res.status(400).json({
                success: false,
                message: "Appointment must start after 7 AM and end before 10 PM."
            });
        }

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
    const { address, startDate, startTime, duration, jobDescription, phoneNumber } = req.body;

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { address, startDate, startTime, duration, jobDescription, phoneNumber },
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
            message: "Booking deleted"
        })
    } catch (error) {
        console.error(`Error:\n${error}`);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}