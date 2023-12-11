const express = require("express")
const cookieParser = require("cookie-parser")
const { getAllBookings, getBooking, createBooking, updateBooking, deleteBooking } = require("../controllers//bookingController")
const { cookieAuth , auth, isAdmin } = require("../auth/auth")

const bookingRouter = express.Router()
bookingRouter.use(cookieParser())

bookingRouter.get("/api/boookings", getAllBookings)
bookingRouter.post("/api/bookings", createBooking)
bookingRouter.get("/api/bookings/:bookingId", getBooking)
bookingRouter.put("/api/bookings/:bookingId", updateBooking)
bookingRouter.delete("/api/bookings/:bookingId", deleteBooking)

module.exports = bookingRouter