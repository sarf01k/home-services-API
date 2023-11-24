const jwt = require("jsonwebtoken")

exports.generateToken = (email) => {
	return jwt.sign(email, process.env.JWT_SECRET, {
		expiresIn: "7d",
	})
}