const express = require("express")
const cookieParser = require("cookie-parser")
const { getCategories, addCategory, deleteCategory, getCategory } = require("../controllers/categoryController")
const { cookieAuth , auth, isAdmin } = require("../auth/auth")

const serviceCategoryRouter = express.Router()
serviceCategoryRouter.use(cookieParser())

serviceCategoryRouter.get("/api/category", getCategories)
serviceCategoryRouter.post("/api/category/add", addCategory)
serviceCategoryRouter.delete("/api/category/delete", deleteCategory)
serviceCategoryRouter.get("/api/category/:categoryId", getCategory)

module.exports = serviceCategoryRouter