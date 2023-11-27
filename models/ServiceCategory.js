const mongoose = require("mongoose")
const Schema = mongoose.Schema

const serviceCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    services: [{
        type: Schema.Types.ObjectId,
        ref: 'Service',
    }],
})

const ServiceCategory = mongoose.model("ServiceCategory", serviceCategorySchema)

module.exports = ServiceCategory