const mongoose = require("mongoose")
const Schema = mongoose.Schema

const serviceCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
})

const ServiceCategory = mongoose.model("ServiceCategory", serviceCategorySchema)

module.exports = ServiceCategory