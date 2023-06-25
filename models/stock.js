const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    qnty: {//number of tablets / bottles / tubes / vials
        type: Number,
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
    batch: {
        type: String,
        required: true,
    },
    pId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "products"
    }
})

module.exports = mongoose.model('stock', productSchema);
