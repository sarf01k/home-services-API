const mongoose = require("mongoose")
const Schema = mongoose.Schema

const serviceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'ServiceCategory',
        required: true,
    },
    price: {
        type: Number,
        required: true
    }
})

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service