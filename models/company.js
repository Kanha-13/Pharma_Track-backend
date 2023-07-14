const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        require: true,
        uppercase: true
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
    distributors: [{
        type: String
    }]
})

module.exports = mongoose.model('company', companySchema);

