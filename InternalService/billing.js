const Bill = require("../models/billing")

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

const BILLING = {
  getBillsQuery,
}

module.exports = BILLING;