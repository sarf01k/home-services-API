const User = require("../models/User")

exports.makeUserAdmin = async (req, res) => {
    const { userId } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { role: 'admin' } },
            { new: true }
        )

        if (!updatedUser) {
            return { success: false, message: 'User not found' };
        }

        return res.status(200).json({
            success: true,
            user: updatedUser
        })
    } catch (error) {
        console.error(`Error:\n${error}`);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}