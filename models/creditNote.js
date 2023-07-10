const mongoose = require('mongoose');

const cnSchema = new mongoose.Schema({
  productsDetail: [
    {
      pId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "products"
      },
      itemName: {
        type: String,
        require: true,
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
      returnedQnty: {//number of tabs / bottles / tubes / vials
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
      disc: {
        type: String,
        require: true,
      },
      expDate: {
        type: Date,
        required: true,
      },
      total: {
        type: String,
        required: true

      },
    }
  ],
  billingDate: {
    type: Date,
    required: true,
  },
  cnNo: {
    type: String,
    required: true,
  },
  prescribedBy: {
    type: String,
    default: "",
    uppercase: true,
    // required: true,
  },
  patientName: {
    type: String,
    required: true,
    uppercase: true,
  },
  mobileNumber: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  subTotal: {
    type: String,
    required: true,
    default: "",
  },
  discount: {
    type: String,
    default: "0"
  },
  grandTotal: {
    type: String,
    required: true,
    default: ""
  },
  amtRefund: {
    type: String,
    required: true,
    default: ""
  },
  amtDue: {//the amt we owe to customer
    type: String,
    required: true,
    default: ""
  },
  roundoff: {
    type: String,
    default: ""
  },
})

module.exports = mongoose.model('creditNote', cnSchema);