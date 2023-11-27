const express = require("express")
const cookieParser = require("cookie-parser")
const { getCategories, addCategory, deleteCategory, getCategory } = require("../controllers/serviceCategoryController")
const { cookieAuth , auth, isAdmin } = require("../auth/auth")

const serviceCategoryRouter = express.Router()
serviceCategoryRouter.use(cookieParser())

serviceCategoryRouter.get("/api/service-categories", getCategories)
serviceCategoryRouter.post("/api/service-categories/add", addCategory)
serviceCategoryRouter.delete("/api/service-categories/delete", deleteCategory)
serviceCategoryRouter.get("/api/service-categories/:categoryId", getCategory)

module.exports = serviceCategoryRouter