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
    qnty: {
        type: Number,
        required: false,
        min: 0
    },
    category: {
        type: String,
        require: true,
    },
    parentCategory:{// generic , general, ayurvedic, elopathic, homeopathic
        type: String,
        require: true
    },
    minQnty:{
        type: Number,
        required: true,
        default:0
    },
})

module.exports = mongoose.model('product', productSchema);
