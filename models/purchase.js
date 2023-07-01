const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  productsDetail: [
    {
      pId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "products"
      },
      batch: {
        type: String,
        required: true,
      },
      qnty: {//number of tablets / bottles / tubes / vials
        type: Number,
        required: true,
      },
      free: {//number of strips / bottles / tubes / vials
        type: Number,
        required: true,
      },
      mrp: {
        type: String,
        require: true,
      },
      rate: {
        type: String,
        require: true,
      },
      cashDisc: {
        type: String,
        require: true,
      },
      schemeDisc: {
        type: String,
        require: true,
      },
      netRate: {//reducing schemes and discount
        type: String,
        require: true,
      },
      expDate: {
        type: Date,
        required: true,
      },
      schemeDisc: {
        type: String,
        required: true
      },
      cashDisc: {
        type: String,
        required: true
      },
      netTax: {
        type: String,
        required: true
      },
      netValue: {
        type: String,
        required: true

      },
      netAmt: {
        type: String,
        required: true

      },
    }
  ],
  purDate: {
    type: Date,
    required: true,
  },
  vId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vendors"
  },
  billNo: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    required: true
  },
  totalAmt: {
    type: Number,
    required: true
  },
  totalValue:{
    type: Number,
    required: true
  },
  totalTax:{
    type: Number,
    required: true
  },
})

module.exports = mongoose.model('purchase', purchaseSchema);
