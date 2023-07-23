const mongoose = require('mongoose');

const vendor = new mongoose.Schema({
    vendorName: {
        type: String,
        require: true,
        uppercase:true
    },
    address: {
        type: String,
    },
    mobileNo: {
        type: String,
    },
    gstNo: {
        type: String,
    },
    licenceNo: {
        type: String,
    },
    balance: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('vendor', vendor);

