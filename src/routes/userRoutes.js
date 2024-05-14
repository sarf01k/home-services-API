const express = require("express")
const cookieParser = require("cookie-parser")
const { register, login, getUsers, logout, fetchUserProfile, editUserProfile, changePassword, fetchOtherUserProfile } = require("../controllers/userController")
const { cookieAuth, isAdmin } = require("../auth/auth")
const { makeUserAdmin } = require("../utils/makeUserAdmin")
const Service = require("../models/Service")
const User = require("../models/User")

const userRouter = express.Router()
userRouter.use(cookieParser())


userRouter.get("/logout", logout)
userRouter.post("/register", register)
userRouter.post("/login", login)

userRouter.get("/home", cookieAuth, async (req, res) => {
    try {
        const user = req.user;
        if (user) {
            const services = await Service.find();
            res.status(200).render("home", { services: services });
        } else {
            res.redirect("/login")
        }
    } catch (error) {
        console.error(`Error:\n${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

userRouter.get("/register", async (req, res) => {
    try {
        res.render("sign_up")
    } catch (error) {
        console.error(`Error:\n${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

userRouter.get("/login", async (req, res) => {
    try {
        res.render("log_in")
    } catch (error) {
        console.error(`Error:\n${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// userRouter.get("/", cookieAuth, isAdmin, getUsers)
userRouter.get("/profile", cookieAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.existingUser._id);
        res.render("profile", { user: user })
    } catch (error) {
        console.error(`Error:\n${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

userRouter.post("/profile", cookieAuth, editUserProfile)
// userRouter.put("/profile", cookieAuth, editUserProfile)
// userRouter.post("/profile/change-password", cookieAuth, changePassword)
// userRouter.get("/profile/:userId", cookieAuth, isAdmin, adminFetchUserProfile)

// userRouter.post("/make-admin", cookieAuth, isAdmin, makeUserAdmin)

module.exports = userRouter