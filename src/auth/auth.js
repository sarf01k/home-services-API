const path = require("path");
const jwt = require("jsonwebtoken");
const { login } = require("../controllers/userController");
require("dotenv").config();

exports.cookieAuth = (req, res, next) => {
	if (!req.cookies || !req.cookies.access_token) {
        return res.redirect("/login");
    }

    const token = req.cookies.access_token;

    try {
        req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		const user = req.user
		console.log(user);
		next()
    } catch (error) {
        res.clearCookie("access_token").status(401).json({ message: "Authentication failed" })
    }
}

exports.isAdmin = async (req, res, next) => {
	const user = req.user.existingUser
	if (user.role === "admin") {
		next()
	} else {
		return res.status(401).json({
			success: false,
			message: "You are not authorized to perform this action. Contact the admin",
		})
	}
}