const Bill = require("../models/billing")
const CN = require("../models/creditNote")
const TRADE = require("./trade")

const getBillsQuery = async (query) => {
  try {
    let searchQuery = {}
    searchQuery.patientName = query.patientName.toUpperCase()
    searchQuery.billingDate = { "$lte": new Date(query.to), "$gte": new Date(query.from) }

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

const updateBillPayment = async (data) => {
  const { bills, patientName, paymentDetail } = data
  try {
    const updateData = {
      amtDue: 0,
      paymentType: paymentDetail.paymentMode,
      paymentId: paymentDetail.paymentId,
      paymentDate: paymentDetail.paymentDate
    }
    const [response1, response2] = await Promise.all([
      await Bill.updateMany({ _id: { $in: bills } }, updateData),
      await TRADE.updateOneTradeCreditAndLoss(paymentDetail.paymentDate, { creditCollection: paymentDetail.amtPaid }),
    ])

    if (response1.err || response2.err)
      return { data: null, err: { err1: response1.err, err2: response2.err } }

    return { data: "payment recorded", err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const BILLING = {
  getBillsQuery,
  updateCN,
  updateBillPayment
}

module.exports = BILLING;