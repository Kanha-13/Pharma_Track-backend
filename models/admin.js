const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    adminName:{
        type:String,
        require:true
    },
    otpVerified:{
        type:Boolean,
        require:true,
        default:false
    }
})

module.exports = mongoose.model('admin',adminSchema);

