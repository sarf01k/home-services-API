const express = require("express")
const cookieParser = require("cookie-parser")
const { register, login, getUsers, logout, fetchUserProfile, editUserProfile, changePassword, fetchOtherUserProfile } = require("../controllers/userController")
const { cookieAuth, isAdmin } = require("../auth/auth")
const { makeUserAdmin } = require("../utils/makeUserAdmin")

const userRouter = express.Router()
userRouter.use(cookieParser())

userRouter.get("/register", async (req, res) => {
    try {
        res.render("sign_up")
    } catch (error) {
        console.error(`Error:\n${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
userRouter.post("/register", register)

userRouter.get("/login", async (req, res) => {
    try {
        res.render("log_in")
    } catch (error) {
        console.error(`Error:\n${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
userRouter.post("/login", login)
userRouter.get("/logout", logout)
// userRouter.get("/", cookieAuth, isAdmin, getUsers)
userRouter.get("/profile", cookieAuth, isAdmin, fetchUserProfile)
userRouter.put("/profile", cookieAuth, editUserProfile)
userRouter.post("/profile/change-password", cookieAuth, changePassword)
userRouter.get("/profile/:userId", cookieAuth, isAdmin, fetchOtherUserProfile)

userRouter.post("/make-admin", cookieAuth, isAdmin, makeUserAdmin)

module.exports = userRouter