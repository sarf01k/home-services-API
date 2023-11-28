const Service = require("../models/Service");
const ServiceCategory = require("../models/Category");

exports.getServices = async (req, res) => {
    try {
        const services = await Service.find()
        return res.status(200).json({
            success: true,
            services: services
        })
    } catch (error) {
        console.error(`Error:\n${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

exports.addService = async (req, res) => {
    // const admin = req.user.existinguser
    try {
        const { title, description, category, price } = req.body

        if (!title) {
            return res.status(400).json({ message: "Please provide a service name" })
        }

        const existingService = await Service.findOne({ title })

        if (existingService) {
            return res.status(400).json({
                success: false,
                message: "Service already exists"
            })
        }

        const categoryExists = await ServiceCategory.findById(category)

        if (!categoryExists) {
            return res.status(400).json({ message: "Category does not exist" })
        }

        const service = await Service.create({
            title,
            description,
            category,
            price
        })

        const addToCategory = await ServiceCategory.findByIdAndUpdate(
            service.category,
            { $push: { services: service._id} },
            {new: true}
        )

        return res.status(200).json({
            success: true,
            message: "Service created",
            service: service
        })

    } catch (error) {
        console.log(`Error:\n${error}`)
		return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}