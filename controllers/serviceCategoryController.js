const ServiceCategory = require("../models/ServiceCategory")

exports.getServiceCategories = async (req, res) => {
    try {
        const serviceCategories = await ServiceCategory.find()
        return res.status(200).json({
            success: true,
            serviceCategories: serviceCategories
        })
    } catch (error) {
        
    }
}