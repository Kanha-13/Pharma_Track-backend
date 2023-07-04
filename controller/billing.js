const INTERNAL_SERVICE = require("../InternalService");
const SUCCESS = require("../constants/successMessage");
const BillService = require("../services/billing");

const addBillHandler = async (req, res) => {
  let data = req.body;
  const response1 = await BillService.addBill(data)
  if (response1.err)
    return res.status(500).json({ data: null, err1: response1.err })

  data.productsDetail.map((prod) => {
    prod.qnty = - prod.soldQnty // to decrement the quantity of stocks from Product and Stocks collection
  })

  const [response2, response3] = await Promise.all([
    await INTERNAL_SERVICE.PRODUCTS.updateMultipleProductsQnty(data.productsDetail),
    await INTERNAL_SERVICE.STOCKS.updateMultipleStocksQnty(data.productsDetail)
  ])

  if (response2.err || response3.err)
    res.status(500).json({ data: null, error: { err2: response2.err, err3: response3.err } })
  else
    res.status(201).json({ data: response1.data, error: null })
}

const updateBillHandler = async (req, res) => {
  const data = req.body;
  const id = req.params.id
  const response = await BillService.updateBill(id, data)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: SUCCESS.PURCHASE.UPDATE_SUCCESS, error: response.err })
}

const getBillsHandler = async (req, res) => {
  const response = await BillService.getBillQuery(req.query)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: response.data, error: response.err })
}

const getBillHandler = async (req, res) => {
  const purId = req.params.id
  const response = await BillService.getBillById(purId)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: response.data, error: response.err })
}

const deleteBillHandler = async (req, res) => {
  const id = req.params.id //billing id
  let resp = await BillService.getBillById(id)
  const billingData = resp.data
  const [response1, response2] = await Promise.all([await BillService.deleteBill(id), await INTERNAL_SERVICE.PRODUCTS.updateProductQnty(billingData.pId, { qnty: -billingData.qnty })])
  if (response1.err || response2.err)
    res.status(500).json({ data: null, error: { err1: response1.err, err2: response2.err } })
  else
    res.status(200).json({ data: SUCCESS.PURCHASE.DELETE_SUCCESS, error: null });
}

const BillController = {
  addBillHandler, updateBillHandler,
  getBillHandler, getBillsHandler, deleteBillHandler
}

module.exports = BillController