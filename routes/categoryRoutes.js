const express = require("express")
const cookieParser = require("cookie-parser")
const { getCategories, addCategory, updateCategory, deleteCategory, getCategory } = require("../controllers/categoryController")
const { cookieAuth , auth, isAdmin } = require("../auth/auth")

const serviceCategoryRouter = express.Router()
serviceCategoryRouter.use(cookieParser())

serviceCategoryRouter.get("/api/categories", getCategories)
serviceCategoryRouter.post("/api/categories/add", cookieAuth, isAdmin, addCategory)
serviceCategoryRouter.get("/api/categories/:categoryId", getCategory)
serviceCategoryRouter.put("/api/categories/update/:categoryId", cookieAuth, isAdmin, updateCategory)
serviceCategoryRouter.delete("/api/categories/delete/:categoryId", cookieAuth, isAdmin, deleteCategory)

module.exports = serviceCategoryRouter