const mongoose = require('mongoose');

const settlementSchema = new mongoose.Schema({
  returnQnty: {//number of tablets / bottles / tubes / vials
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  pId: {//product id
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "products"
  },
  vId: {//vendor id to whome stock returned, because vendor to whome stock purchased could be different in some case
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "vendors"
  },
  batch: {
    type: String,
    required: true
  },
  expDate: {
    type: Date,
    required: true,
  },
  mrp: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    required: true,
    default: "PENDING"
  },
  type: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('settlement', settlementSchema);
