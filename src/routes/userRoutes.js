const express = require("express")
const cookieParser = require("cookie-parser")
const { register, login, getUsers, logout, fetchUserProfile, editUserProfile, changePassword, fetchOtherUserProfile, logoutMiddleware } = require("../controllers/userController")
const { cookieAuth , auth, isAdmin } = require("../auth/auth")
const { makeUserAdmin } = require("../utils/makeUserAdmin")

const userRouter = express.Router()
userRouter.use(cookieParser())

userRouter.post("/api/auth/register", register)
userRouter.post("/api/auth/login", login)
userRouter.get("/api/auth/logout", logout)
userRouter.get("/api/auth/users", cookieAuth, isAdmin, getUsers)
userRouter.get("/api/user/profile", cookieAuth, isAdmin, fetchUserProfile)
userRouter.put("/api/user/profile", cookieAuth, editUserProfile)
userRouter.post("/api/user/profile/password", cookieAuth, changePassword)
userRouter.get("/api/user/profile/:userId", cookieAuth, isAdmin, fetchOtherUserProfile)

userRouter.post("/api/admin/make-admin", cookieAuth, isAdmin, makeUserAdmin)

module.exports = userRouter