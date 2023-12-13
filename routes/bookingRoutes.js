const express = require("express")
const cookieParser = require("cookie-parser")
const { getAllBookings, getBooking, createBooking, updateBooking, deleteBooking, getBookings } = require("../controllers/bookingController")
const { cookieAuth , isAdmin } = require("../auth/auth")

const bookingRouter = express.Router()
bookingRouter.use(cookieParser())

bookingRouter.get("/api/admin/all-bookings", cookieAuth, isAdmin, getAllBookings)
bookingRouter.get("/api/bookings", cookieAuth, getBookings)
bookingRouter.post("/api/bookings", cookieAuth, createBooking)
bookingRouter.get("/api/bookings/:bookingId", cookieAuth, getBooking)
bookingRouter.put("/api/bookings/:bookingId", cookieAuth, updateBooking)
bookingRouter.delete("/api/bookings/:bookingId", cookieAuth, deleteBooking)

module.exports = bookingRouter