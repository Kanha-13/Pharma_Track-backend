const mongoose = require('mongoose');

const partyPurchaseSchema = new mongoose.Schema({
    partyName: {
        type: String,
        require: true
    },
    totalPurchaseOf: {
        type: Number
    },
    date: Date,
    billNo: Array,
    // billDetail: {
    //     billnO: String,
    //     payMode: String,
    // },
})

module.exports = mongoose.model('partyPurchase', partyPurchaseSchema);

