const express = require("express")
const cookieParser = require("cookie-parser")
const { getServices, addService } = require("../controllers/serviceController")
const { cookieAuth , auth, isAdmin } = require("../auth/auth")

const serviceRouter = express.Router()
serviceRouter.use(cookieParser())

serviceRouter.get("/api/services", getServices)
serviceRouter.post("/api/service/add", addService)

module.exports = serviceRouter