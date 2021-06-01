const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
    },
    otp:{
        type:Number,
        require:true,
    },
    userEmail:{
        type:String,
        require:true,
    }
})

module.exports = mongoose.model('otp',otpSchema);

