const express = require("express")
const cookieParser = require("cookie-parser")
const { register, login, getUsers, logout, fetchUserProfile, editUserProfile, changePassword } = require("../controllers/userController")
const { cookieAuth , auth, isAdmin } = require("../auth/auth")

const userRouter = express.Router()
userRouter.use(cookieParser())

userRouter.post("/api/auth/register", register)
userRouter.post("/api/auth/login", login)
userRouter.get("/api/auth/users", cookieAuth, isAdmin, getUsers)
userRouter.get("/api/user/profile", cookieAuth, fetchUserProfile)
userRouter.put("/api/user/profile", cookieAuth, editUserProfile)
userRouter.post("/api/user/profile/password", cookieAuth, changePassword)

module.exports = userRouter