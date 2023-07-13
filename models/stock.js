const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    qnty: {//number of tablets / bottles / tubes / vials
        type: Number,
        required: true,
        default:0,
        min:0
    },
    expDate: {
        type: Date,
        required: true,
    },
    mrp: {
        type: Number,
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
    },
    vId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vendors"
    },
    status:{
        type:String,
        required:true,
        default:"ACTIVE"
    }
})

module.exports = mongoose.model('stock', stockSchema);
