const Bill = require("../models/billing")
const mongoose = require('mongoose');


const addBill = async (data) => {
  try {
    const invoiceCount = await Bill.countDocuments()
    data.billInfo.invoiceNo = invoiceCount + 1
    const Data = {
      ...data.billInfo, productsDetail: data.productsDetail
    }
    const res = await Bill.create(Data);
    return { data: res, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const updateBill = async (id, data) => {
  try {
    const response = await Bill.updateOne({ _id: id }, data)
    return { data: response, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const getBillById = async (id) => {
  try {
    const res = await Bill.findById(id);
    return { data: res, err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const getBillQuery = async (query) => {
  try {
    const pId = query.pId
    const res = await Bill.aggregate([
      { $match: { pId: mongoose.Types.ObjectId(pId) } },
      {
        $lookup: {
          from: 'vendors',
          localField: 'vId',
          foreignField: '_id',
          as: 'vendorDetail'
        }
      }
    ]);
    return { data: res, err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const deleteBill = async (id) => {
  try {
    const response = await Bill.deleteOne({ _id: id })
    return { data: response, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const BillService = { addBill, updateBill, getBillQuery, deleteBill, getBillById }


module.exports = BillService