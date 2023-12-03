const ServiceCategory = require("../models/Category")

exports.getCategories = async (req, res) => {
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

exports.getCategory = async (req, res) => {
    try {
        const { categoryId } = req.params
        const serviceCategory = await ServiceCategory.findById(categoryId).populate("services")
        return res.status(200).json({
            success: true,
            serviceCategory: serviceCategory
        })
    } catch (error) {
        console.error(`Error:\n${error}`);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

exports.updateCategory = async (req,res) => {
    const categoryUpdate = req.body;
    try {
        const { categoryId } = req.params

        if (!req.body) {
            return res.status(400).json({
                message: "Please update a field"
            })
        }

        const category = await ServiceCategory.findByIdAndUpdate(categoryId, categoryUpdate, { new: true });

        if (!category) {
            return res.status(404).json({ success: false, message:  "Category does not exist" })
        }

        return res.status(200).json({
            success: true,
            message: "Category updated",
            updatedCategory: category
        });
    } catch (error) {
        console.error(`Error:\n${error}`);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

exports.addCategory = async (req, res) => {
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

exports.deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params

        const existingCategory = await ServiceCategory.findOne({ _id: categoryId })

        if (!existingCategory) {
            return res.status(400).json({ message: "Category does not exist" })
        }

        const category = await ServiceCategory.deleteOne({ _id: categoryId })

        return res.status(200).json({
            success: true,
            message: "Category deleted"
        })
    } catch (error) {
        console.log(`Error:\n${error}`)
		return res.status(500).json({ success: false, message: "Internal server error" })
    }
}