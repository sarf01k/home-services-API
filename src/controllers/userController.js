const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const path = require("path");
const Service = require("../models/Service");

const viewsPath = path.join(__dirname, "..", "views")

exports.getUsers = async (req, res) => {
    const admin = req.user.existingUser
    try {
        const users = await User.find();
        return res.status(200).json({
            success: true,
            message: `Hello Admin, ${admin.first_name}`,
            users: users
        })
    } catch (error) {
        console.error(`Error:\n${error}`);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

exports.register = async (req, res) => {
    try {
        const { first_name, last_name, phone, email, password } = req.body;

        if (!first_name || !last_name || !phone || !email || !password) {
    		return res.status(400).json({ message: "Please fill all fields" })
    	}

        const existingUser = await User.findOne({ email })

    	if (existingUser) {
    		return res.status(400).json({ success: false, message: "User already exists" })
    	}

        const salt = await bcrypt.genSalt(10)
    	const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            first_name,
            last_name,
            phone,
            email,
            password: hashedPassword,
            createdAt: new Date().toJSON(),
        });

        const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" })
        user.token = token;
        res.status(200).cookie("access_token", token, {
            httpOnly: true,
        }).redirect("/api/home");;
    } catch (error) {
        console.log(`Error:\n${error}`)
		return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if ( !email || !password) {
    		return res.status(400).json({ message: "Please fill all fields" })
    	}

        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status(400).json({ message: "Email not registered" })
        }

        const match = await bcrypt.compare(password, existingUser.password)

        if (!match) {
            return res.status(401).json({ message: "Wrong email or password" })
        }

        const token = jwt.sign({ existingUser }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" })
        existingUser.token = token;
        res.status(200).cookie("access_token", token, {
            httpOnly: true,
        }).redirect("/api/home");
    } catch (error) {
        console.log(`Error:\n${error}`)
		res.status(500).json({ success: false, message: "Internal server error" })
    }
}

exports.logout = (req, res) => {
    try {
        res.clearCookie('access_token');
        res.status(200).redirect("http://localhost:5000")
    } catch (error) {
        console.log(`Error:\n${error}`)
		res.status(500).json({ success: false, message: "Error logging out" })
    }
};

exports.fetchUserProfile = async (req, res) => {
    const user = req.user.existingUser
    try {
        const userProfile = await User.findById(user._id)

        if (!userProfile) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        return res.status(200).json({
            success: true,
            user: userProfile
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

exports.fetchOtherUserProfile = async (req, res) => {
    try {
        const { userId } = req.params

        const userProfile = await User.findById(userId)

        if (!userProfile) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        return res.status(200).json({
            success: true,
            user: userProfile
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

exports.editUserProfile = async (req, res) => {
    const user = req.user.existingUser
    try {
        const profileEdit = req.body;

        if (!req.body) {
            return res.status(400).json({
                message: "Please update a field"
            })
        }

        const userProfile = await User.findByIdAndUpdate(user._id, profileEdit, { new: true });

        if (!userProfile) {
            return res.status(404).json({ success: false, message:  "User not found" })
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated",
            updatedProfile: profileEdit
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

exports.changePassword = async (req, res) => {
    const user = req.user.existingUser
    const { oldPassword, newPassword } = req.body;
    try {
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ success: false, message: "Please fill all fields" });
        }

        const match = await bcrypt.compare(oldPassword, user.password);

        if (!match) {
            return res.status(401).json({ success: false, message: "Invalid old password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const updatedPassword = await User.findByIdAndUpdate( user._id, { password: hashedPassword }, { new: true } );
		console.log(user);
        console.log(user.password);
        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
            oldPassword: user.password,
            updatedPassword: updatedPassword,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};