const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    location: {
        type: String,
    },
    pkg: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    mnfDate: {
        type: Date,
        required: true,
    },
    expDate: {
        type: Date,
        required: true,
    },
    mrp: {
        type: String,
        require: true,
    },
    rate: {
        type: String,
        required: true,
    },
    gst: {
        type: String,
        required: true,
    },
    netRate: {
        type: String,
        required: true,
    },
    batch: {
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

module.exports = mongoose.model('stock', productSchema);
