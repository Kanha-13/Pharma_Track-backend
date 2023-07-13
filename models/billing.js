const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
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
      soldQnty: {//number of tabs / bottles / tubes / vials
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
  invoiceNo: {
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
    default: 0
  },
  grandTotal: {
    type: Number,
    required: true,
    default: ""
  },
  amtPaid: {
    type: Number,
    required: true,
    default: ""
  },
  amtDue: {
    type: Number,
    required: true,
    default: ""
  },
  roundoff: {
    type: Number,
    default: ""
  },
  creditAmt: {
    type: Number,
    default: ""
  },
  cnId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "creditNotes"
  },
})

module.exports = mongoose.model('saleBill', billSchema);
