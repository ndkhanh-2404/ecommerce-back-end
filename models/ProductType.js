const mongoose = require('mongoose');

const ProductTypeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ProductType', ProductTypeSchema);