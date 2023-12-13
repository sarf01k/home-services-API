const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.cookieAuth = (req,res, next) => {
    const token = req.cookies.access_token
    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		req.user = user
		next()
    } catch (error) {
        res.clearCookie("access_token")
        return res.status(401).json({ message: "Authentication failed" })
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