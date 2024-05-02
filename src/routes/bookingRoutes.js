const express = require("express")
const cookieParser = require("cookie-parser")
const { getAllBookings, getBooking, createBooking, updateBooking, deleteBooking, getBookings } = require("../controllers/bookingController")
const { cookieAuth , isAdmin } = require("../auth/auth")

const bookingRouter = express.Router()
bookingRouter.use(cookieParser())

bookingRouter.get("/all-bookings", cookieAuth, isAdmin, getAllBookings)
// bookingRouter.get("/", cookieAuth, getBookings)
// bookingRouter.post("/", cookieAuth, createBooking)
// bookingRouter.get("/:bookingId", cookieAuth, getBooking)
// bookingRouter.put("/:bookingId", cookieAuth, updateBooking)
// bookingRouter.delete("/:bookingId", cookieAuth, deleteBooking)

module.exports = bookingRouter