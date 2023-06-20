const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    itemName: {
        type: String,
        require: true,
    },
    location: {
        type: String,
    },
    pkg: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    gst: {
        type: String,
        required: true,
    },
    hsn_sac: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('product', productSchema);
