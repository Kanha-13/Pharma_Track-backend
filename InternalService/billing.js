const Bill = require("../models/billing")
const CN = require("../models/creditNote")

const getBillsQuery = async (query) => {
  try {
    let searchQuery = {}
    if (query.patientName)
      searchQuery.patientName = query.patientName.toUpperCase()

    const res = await Bill.aggregate([
      { $match: searchQuery },
      { $project: { productsDetail: 1, billingDate: 1, invoiceNo: 1 } }
    ]);
    return { data: res, err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const updateCN = async (id, data) => {
  try {
    const res = await CN.updateOne({ _id: id }, data)
    return { data: res, err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const BILLING = {
  getBillsQuery,
  updateCN
}

module.exports = BILLING;