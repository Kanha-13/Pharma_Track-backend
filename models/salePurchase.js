const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    date:Date,
    sellAmount:{type:Number},
    purchaseAmount:{type:Number},
    profit:{type:Number}
})

module.exports = mongoose.model('salePurprof',productSchema);
