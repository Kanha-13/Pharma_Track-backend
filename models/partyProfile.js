const mongoose = require('mongoose');

const partyProfileSchema = new mongoose.Schema({
    partyName:{
        type:String,
        require:true
    },
    address:{
        type:String,
    },
    mobileNo:{
        type:String,
    }
})

module.exports = mongoose.model('partyProfile',partyProfileSchema);

