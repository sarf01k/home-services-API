const express = require("express")
const cookieParser = require("cookie-parser")
const { getServices, addService, getService, updateService, deleteService } = require("../controllers/serviceController")
const { cookieAuth , auth, isAdmin } = require("../auth/auth")

const serviceRouter = express.Router()
serviceRouter.use(cookieParser())

serviceRouter.get("/api/services", getServices)
serviceRouter.post("/api/services/add", addService)
serviceRouter.get("/api/services/:serviceId", getService)
serviceRouter.put("/api/services/update/:serviceId", updateService)
serviceRouter.delete("/api/services/delete/:serviceId", deleteService)

module.exports = serviceRouter