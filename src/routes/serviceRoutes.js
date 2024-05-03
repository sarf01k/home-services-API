const express = require("express")
const cookieParser = require("cookie-parser")
const { getServices, addService, getService, updateService, deleteService } = require("../controllers/serviceController")
const { cookieAuth , auth, isAdmin } = require("../auth/auth")

const serviceRouter = express.Router()
serviceRouter.use(cookieParser())

serviceRouter.get("/services", getServices)
serviceRouter.post("/services/add", cookieAuth, isAdmin, addService)
serviceRouter.get("/services/:serviceId", getService)
serviceRouter.put("/services/update/:serviceId", cookieAuth, isAdmin, updateService)
serviceRouter.delete("/services/delete/:serviceId", cookieAuth, isAdmin, deleteService)

module.exports = serviceRouter