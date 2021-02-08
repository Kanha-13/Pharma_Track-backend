const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
    patientName:{
        type:String,
        require:true,
    },
    mobileNo:{
        type:String,
        require:true,
    },
    age:{
        type:String,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
    billDetail:{
        type:Object,
        require:true,
    },
})

module.exports = mongoose.model('bill',BillSchema);
