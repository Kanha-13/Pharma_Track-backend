const mongoose = require('mongoose');

const vendor = new mongoose.Schema({
    vendorName: {
        type: String,
        require: true
    },
    address: {
        type: String,
    },
    mobileNo: {
        type: String,
    },
    balance: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('vendor', vendor);

