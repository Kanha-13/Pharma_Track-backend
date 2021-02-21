const mongoose = require('mongoose');

const companyListSchema = new mongoose.Schema({
    companyName:String,
    wholeSellers:Array,
    products:Array,
})

module.exports = mongoose.model('companyList',companyListSchema);

