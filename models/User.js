const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
		match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
	},
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const User = mongoose.model("user", userSchema)

module.exports = User