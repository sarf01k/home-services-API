const express = require("express")
const cookieParser = require("cookie-parser")
const { getServiceCategories, addServiceCategory } = require("../controllers/serviceCategoryController")
const { cookieAuth , auth, isAdmin } = require("../auth/auth")

const serviceCategoryRouter = express.Router()
serviceCategoryRouter.use(cookieParser())

serviceCategoryRouter.get("/api/service-categories", getServiceCategories)
serviceCategoryRouter.post("/api/service-categories/add", addServiceCategory)

module.exports = serviceCategoryRouter