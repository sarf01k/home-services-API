const ServiceCategory = require("../models/ServiceCategory")

exports.getServiceCategories = async (req, res) => {
    try {
        const serviceCategories = await ServiceCategory.find()
        return res.status(200).json({
            success: true,
            serviceCategories: serviceCategories
        })
    } catch (error) {
        console.error(`Error:\n${error}`);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

exports.addServiceCategory = async (req, res) => {
    try {
        const { name, description } = req.body

        if (!name) {
            return res.status(400).json({ message: "Please provide a category name" })
        }

        const existingCategory = await ServiceCategory.findOne({ name })

        if (existingCategory) {
            return res.status(400).json({ success: false, message: "Category already exists" })
        }

        const serviceCategory = await ServiceCategory.create({
            name,
            description
        })

        return res.status(200).json({
            success: true,
            message: "Category created",
            serviceCategory: serviceCategory
        })
    } catch (error) {
        console.log(`Error:\n${error}`)
		return res.status(500).json({ success: false, message: "Internal server error" })
    }
}