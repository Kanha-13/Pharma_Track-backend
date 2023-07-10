const INTERNAL_SERVICE = require("../InternalService");

const getMedicineHistoryHandler = async (req, res) => {
  if (!req.query.patientName)
    return res.status(400).json({ data: null, error: "Empty query" })

  const bills = await INTERNAL_SERVICE.BILLING.getBillsQuery(req.query)
  if (bills.err)
    res.status(500).json({ data: null, error: response.err })
  else {
    let medicineHistory = []
    bills.data.map((bill, index) => {
      medicineHistory.push({ products: bill.productsDetail, billingDate: bill.billingDate, invoiceNo: bill.invoiceNo })
    })
    res.status(200).json({ data: medicineHistory, error: null })
  }
}

const PatientController = {
  getMedicineHistoryHandler
}

module.exports = PatientController