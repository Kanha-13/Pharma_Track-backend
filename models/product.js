const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    itemName:{
        type:String,
        require:true,
    },
    
    location:{
        type:String,
    },
    qnty:{
        type:String,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    company:{
        type:String,
        required:true,
    },
    mnfDate:{
        type:Date,
        required:true,
    },
    expDate:{
        type:Date,
        required:true,
    },
    mrp:{
        type:String,
        require:true,
    },
    rate:{
        type:String,
        required:true,
    },
    gst:{
        type:String,
        required:true,
    },
    netRate:{
        type:String,
        required:true,
    },
    batch:{
        type:String,
        required:true,
    },
    seller:{
        type:Array,
        required:true,
    },
    billNo:{
        type:String,
        required:true,
    },
    purDate:[{
        type:Date,
        required:true,
    }]

})

module.exports = mongoose.model('product',productSchema);
