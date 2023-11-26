const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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
        const { first_name, last_name, email, password } = req.body

        if (!first_name || !last_name || !email || !password) {
    		return res.status(400).json({ message: "Please fill all fields" })
    	}

        const existingUser = await User.findOne({ email })

    	if (existingUser) {
    		return res.status(400).json({ message: "User already exists" })
    	}

        const salt = await bcrypt.genSalt(10)
    	const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
        })

        return res.status(201).json({
            success: true,
            message: "User created",
            user: user,
        })
    } catch (error) {
        console.log(`Error:\n${error}`)
		return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        if ( !email || !password) {
    		return res.status(400).json({ message: "Please fill all fields" })
    	}

        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            throw new Error("Invalid user credentials")
        }

        const match = await bcrypt.compare(password, existingUser.password)

        if (match) {
            const token = jwt.sign({ existingUser } , process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
            existingUser.token = token;
            return res.cookie("access_token", token, {
                httpOnly: true,
            }).status(200).json({
                success: true,
                message: `Welcome back ${existingUser?.first_name}`,
                id: existingUser._id,
                token: token
            })
        } else {
            return res.status(200).json({
                success: false,
                message: "Wrong password",
            })
        }
    } catch (error) {
        console.log(`Error:\n${error}`)
		res.status(500).json({ success: false, message: "Internal server error" })
    }
}

exports.fetchUserProfile = async (req, res) => {
    const user = req.user.existingUser
    try {
        const userProfile = await User.findById(user._id)

        if (!userProfile) {
            return res.status(404).json({ message: "User not found" })
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
                message: "Please fill all fields"
            })
        }

        const userProfile = await User.findByIdAndUpdate(user._id, profileEdit, { new: true });

        if (!userProfile) {
            return res.status(404).json({ status: "fail", message:  "User not found" })
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