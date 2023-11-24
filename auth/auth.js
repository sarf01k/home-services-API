const jwt = require("jsonwebtoken");
require("dotenv").config();

// exports.auth = (req, res, next) => {
// 	const authHeader = req.headers.authorization
// 	if (!authHeader || !authHeader.startsWith("Bearer ")) {
// 		return res.status(401).json({
// 			status: "Fail",
// 			message: "Authentication failed. Please provide a valid token.",
// 		})
// 	}

// 	const token = authHeader.split(" ")[1]
// 	try {
// 		const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
// 		req.user = user
// 		next()
// 	} catch (error) {
// 		console.log(`JWT verification error:\n${error}`)
// 		return res.status(401).json({
// 			status: "Fail",
// 			message: "Authentication failed. Please provide a valid token.",
// 		})
// 	}
// }

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
	if (req.user.user.role === "admin") {
		next()
	} else {
		return res.status(401).json({
			status: "Fail",
			message: "You are not authorized to perform this action. Contact the admin",
		})
	}
}