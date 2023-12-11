const express = require("express")
const cookieParser = require("cookie-parser")
const { getAllBookings, getBooking, updateCategory, deleteCategory, getCategory } = require("../controllers//bookingController")
const { cookieAuth , auth, isAdmin } = require("../auth/auth")

const bookingRouter = express.Router()
bookingRouter.use(cookieParser())

bookingRouter.get("/api/boookings", getAllBookings)
bookingRouter.post("/api/bookings", addCategory)
bookingRouter.get("/api/bookings/:bookingId", getBooking)
bookingRouter.put("/api/bookings/:bookingId", updateCategory)
bookingRouter.delete("/api/bookings/:bookingId", deleteCategory)

module.exports = bookingRouter