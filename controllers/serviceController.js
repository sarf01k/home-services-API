const Service = require("../models/Service")

exports.getServices = async (req, res) => {
    try {
        const services = await Service.find();
        return res.status(200).json({
            success: true,
            services: services
        })
    } catch (error) {
        console.error(`Error:\n${error}`);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

exports.addService = async (req, res) => {
    const admin = req.user.existinguser
    try {
        
    } catch (error) {
        
    }
}