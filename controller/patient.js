const INTERNAL_SERVICE = require("../InternalService");

const getMedicineHistoryHandler = async (req, res) => {
  if (!(req.query.patientName && req.query.from && req.query.to))
    return res.status(400).json({ data: null, error: "Empty query" })

  const bills = await INTERNAL_SERVICE.BILLING.getBillsQuery(req.query)
  if (bills.err)
    return res.status(500).json({ data: null, error: response.err })

  let medicineHistory = []
  bills.data.map((bill, index) => {
    medicineHistory.push({ products: bill.productsDetail, billingDate: bill.billingDate, invoiceNo: bill.invoiceNo })
  })
  res.status(200).json({ data: medicineHistory, error: null })
}

const creditBillPayment = async (req, res) => {
  const data = req.body

  const response = await INTERNAL_SERVICE.BILLING.updateBillPayment(data)
  if (response.err)
    return res.status(500).json({ data: null, error: response.err })

  res.status(200).json({ data: "Payment recorded successfully!", error: null })
}

const PatientController = {
  getMedicineHistoryHandler,
  creditBillPayment
}

module.exports = PatientController