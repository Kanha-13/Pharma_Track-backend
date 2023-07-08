const Bill = require("../models/billing")
const CN = require("../models/creditNote")

const addBill = async (data) => {
  try {
    const invoiceCount = await Bill.countDocuments()
    data.billInfo.invoiceNo = invoiceCount + 1
    data.billInfo.patientName = data.billInfo.patientName.toUpperCase()
    if (data.billInfo.prescribedBy)
      data.billInfo.prescribedBy = data.billInfo.prescribedBy.toUpperCase()
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

const addCN = async (data) => {
  try {
    const cnCount = await CN.countDocuments()
    data.billInfo.cnNo = cnCount + 1
    data.billInfo.patientName = data.billInfo.patientName.toUpperCase()
    if (data.billInfo.prescribedBy)
      data.billInfo.prescribedBy = data.billInfo.prescribedBy.toUpperCase()
    const Data = {
      ...data.billInfo, productsDetail: data.productsDetail
    }
    const res = await CN.create(Data);
    return { data: res, err: null }
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

const getCNById = async (id) => {
  try {
    const res = await CN.findById(id);
    return { data: res, err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}
const deleteCNById = async (id) => {
  try {
    const res = await CN.deleteOne({ _id: id });
    return { data: res, err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const getBillQuery = async (query) => {
  try {
    let searchQuery = {}
    if (query.patientName)
      searchQuery.patientName = query.patientName.toUpperCase()
    if (query.invoiceNo)
      searchQuery.invoiceNo = query.invoiceNo
    if (query.mobileNumber)
      searchQuery.mobileNumber = query.mobileNumber
    if (query.prescribedBy)
      searchQuery.prescribedBy = query.prescribedBy.toUpperCase()
    if (query.from && query.to) {
      searchQuery.billingDate = {
        $lte: query.to, $gte: query.from
      }
    }
    const res = await Bill.aggregate([
      { $match: searchQuery },
      { $project: { productsDetail: 0 } }
    ]);
    return { data: res, err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const getCNQuery = async (query) => {
  try {
    let searchQuery = {}
    if (query.patientName)
      searchQuery.patientName = query.patientName.toUpperCase()
    if (query.cnNo)
      searchQuery.cnNo = query.cnNo
    if (query.mobileNumber)
      searchQuery.mobileNumber = query.mobileNumber
    if (query.prescribedBy)
      searchQuery.prescribedBy = query.prescribedBy.toUpperCase()
    if (query.from && query.to) {
      searchQuery.billingDate = {
        $lte: query.to, $gte: query.from
      }
    }
    const res = await CN.aggregate([
      { $match: searchQuery },
      { $project: { productsDetail: 0 } }
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

const BillService = { addBill, updateBill, getBillQuery, deleteBill, getBillById, addCN, getCNQuery, getCNById, deleteCNById }


module.exports = BillService