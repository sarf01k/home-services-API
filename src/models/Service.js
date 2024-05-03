const mongoose = require("mongoose")
const Schema = mongoose.Schema

const serviceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    }
})

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service