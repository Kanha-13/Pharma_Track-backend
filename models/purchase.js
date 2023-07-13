const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  productsDetail: [
    {
      pId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "products"
      },
      itemName: {
        type: String,
        required: true,
      },
      pkg: {
        type: String,
        required: true,
      },
      gst: {
        type: String,
        required: true,
      },
      batch: {
        type: String,
        required: true,
      },
      qnty: {//number of strips / bottles / tubes / vials
        type: Number,
        required: true,
      },
      free: {//number of strips / bottles / tubes / vials
        type: Number,
        required: true,
      },
      mrp: {
        type: Number,
        require: true,
      },
      rate: {
        type: Number,
        require: true,
      },
      cashDisc: {
        type: Number,
        require: true,
      },
      schemeDisc: {
        type: Number,
        require: true,
      },
      netRate: {//reducing schemes and discount
        type: Number,
        require: true,
      },
      expDate: {
        type: Date,
        required: true,
      },
      netTax: {
        type: Number,
        required: true
      },
      netValue: {
        type: Number,
        required: true

      },
      netAmt: {
        type: Number,
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
    type: Number,
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
  totalValue: {
    type: Number,
    required: true
  },
  totalTax: {
    type: Number,
    required: true
  },
})

module.exports = mongoose.model('purchase', purchaseSchema);
