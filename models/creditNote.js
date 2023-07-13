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
        type: Number,
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
        type: Number,
        require: true,
      },
      rate: {
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
      total: {
        type: Number,
        required: true

      },
    }
  ],
  billingDate: {
    type: Date,
    required: true,
  },
  cnNo: {
    type: Number,
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
    type: Number,
    required: true,
    default: "",
  },
  discount: {
    type: Number,
    default: "0"
  },
  grandTotal: {
    type: Number,
    required: true,
    default: ""
  },
  amtRefund: {
    type: Number,
    required: true,
    default: ""
  },
  amtDue: {//the amt we owe to customer
    type: Number,
    required: true,
    default: ""
  },
  roundoff: {
    type: Number,
    default: ""
  },
  status: {
    type: String,
    required: true,
    default: "PENDING"
  }
})

module.exports = mongoose.model('creditNote', cnSchema);
