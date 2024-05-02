const express = require("express")
const cookieParser = require("cookie-parser")
const { getServices, addService, getService, updateService, deleteService } = require("../controllers/serviceController")
const { cookieAuth , auth, isAdmin } = require("../auth/auth")

const serviceRouter = express.Router()
serviceRouter.use(cookieParser())

// serviceRouter.get("/", getServices)
serviceRouter.post("/add", cookieAuth, isAdmin, addService)
// serviceRouter.get("/:serviceId", getService)
serviceRouter.put("/update/:serviceId", cookieAuth, isAdmin, updateService)
serviceRouter.delete("/delete/:serviceId", cookieAuth, isAdmin, deleteService)

module.exports = serviceRouter