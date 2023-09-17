const mongoose = require('mongoose');

const purchaseCNSchema = new mongoose.Schema({
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
      mrp: {
        type: Number,
        require: true,
      },
      disc: {
        type: Number,
        require: true,
      },
      expDate: {
        type: Date,
        required: true,
      },
      totalAmt: {
        type: Number,
        required: true

      },
    }
  ],
  cnDate: {
    type: Date,
    required: true,
  },
  vId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vendors"
  },
  cnNo: {
    type: String,
    required: true,
  },
  totalAmt: {
    type: Number,
    required: true
  },
})

module.exports = mongoose.model('purchasecns', purchaseCNSchema);
