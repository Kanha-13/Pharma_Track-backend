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
  console.log(query)
  try {
    let searchQuery = {}
    if (query.patientName)
      searchQuery.patientName = query.patientName
    if (query.invoiceNo)
      searchQuery.invoiceNo = query.invoiceNo
    if (query.mobileNumber)
      searchQuery.invoiceNo = query.mobileNumber
    if (query.prescribedBy)
      searchQuery.prescribedBy = query.prescribedBy
    if (query.from && query.to) {
      searchQuery.billingDate = {
        $lte: query.to, $gte: query.from
      }
    }
    console.log(searchQuery)
    const res = await Bill.find(searchQuery);
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