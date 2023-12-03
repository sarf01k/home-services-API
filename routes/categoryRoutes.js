const express = require("express")
const cookieParser = require("cookie-parser")
const { getCategories, addCategory, updateCategory, deleteCategory, getCategory } = require("../controllers/categoryController")
const { cookieAuth , auth, isAdmin } = require("../auth/auth")

const serviceCategoryRouter = express.Router()
serviceCategoryRouter.use(cookieParser())

serviceCategoryRouter.get("/api/categories", getCategories)
serviceCategoryRouter.post("/api/categories/add", addCategory)
serviceCategoryRouter.get("/api/categories/:categoryId", getCategory)
serviceCategoryRouter.put("/api/categories/update/:categoryId", updateCategory)
serviceCategoryRouter.delete("/api/categories/delete/:categoryId", deleteCategory)

module.exports = serviceCategoryRouter