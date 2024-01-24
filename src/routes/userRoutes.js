const express = require("express")
const cookieParser = require("cookie-parser")
const { register, login, getUsers, logout, fetchUserProfile, editUserProfile, changePassword, fetchOtherUserProfile } = require("../controllers/userController")
const { cookieAuth, isAdmin } = require("../auth/auth")
const { makeUserAdmin } = require("../utils/makeUserAdmin")

const userRouter = express.Router()
userRouter.use(cookieParser())

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/logout", logout)
userRouter.get("/", cookieAuth, isAdmin, getUsers)
userRouter.get("/profile", cookieAuth, isAdmin, fetchUserProfile)
userRouter.put("/profile", cookieAuth, editUserProfile)
userRouter.post("/profile/change-password", cookieAuth, changePassword)
userRouter.get("/profile/:userId", cookieAuth, isAdmin, fetchOtherUserProfile)

userRouter.post("/make-admin", cookieAuth, isAdmin, makeUserAdmin)

module.exports = userRouter