const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    ProductType: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description:{
        type: String
    },
    evaluation:{
        type: Number,
        min: 0,
        max: 5,
        default: 5
    }
});

module.exports = mongoose.model('Product', ProductSchema);