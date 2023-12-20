const express = require("express")
const cookieParser = require("cookie-parser")
const { getCategories, addCategory, updateCategory, deleteCategory, getCategory } = require("../controllers/categoryController")
const { cookieAuth , auth, isAdmin } = require("../auth/auth")

const serviceCategoryRouter = express.Router()
serviceCategoryRouter.use(cookieParser())

serviceCategoryRouter.get("/", getCategories)
serviceCategoryRouter.post("/add", cookieAuth, isAdmin, addCategory)
serviceCategoryRouter.get("/:categoryId", getCategory)
serviceCategoryRouter.put("/update/:categoryId", cookieAuth, isAdmin, updateCategory)
serviceCategoryRouter.delete("/delete/:categoryId", cookieAuth, isAdmin, deleteCategory)

module.exports = serviceCategoryRouter