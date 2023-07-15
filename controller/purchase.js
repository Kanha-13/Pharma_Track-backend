const INTERNAL_SERVICE = require("../InternalService");
const SUCCESS = require("../constants/successMessage");
const PurchaseService = require("../services/purchase");
const { analyseParentCategory } = require("../utils/billing");

const addPurchaseHandler = async (req, res) => {
  let data = req.body;
  const response1 = await PurchaseService.addPurchase(data)
  if (response1.err)
    return res.status(500).json({ data: null, error: response1.err })

  const categoryReport = analyseParentCategory(data.productsDetail)
  data.billInfo.categoryWisePurchase = categoryReport //in rupees

  data.productsDetail = data.productsDetail.map((prod) => {
    if (prod.category === "TABLET")
      return { ...prod, qnty: prod.qnty * prod.pkg }
    else return prod
  })

  const [response2, response3, response4] = await Promise.all([
    await INTERNAL_SERVICE.PRODUCTS.updateMultipleProductsQnty(data.productsDetail),
    await INTERNAL_SERVICE.STOCKS.addMultipleStocks(data.productsDetail),
    await INTERNAL_SERVICE.TRADE.updateOnePurchaseTrade(data.billInfo.purDate, data),
  ])

  if (response2.err || response3.err || response4.err)
    res.status(500).json({ data: null, error: { err2: response2.err, err3: response3.err, err4: response4.err } })
  else
    res.status(201).json({ data: SUCCESS.PURCHASE.ADD_SUCCESS, error: null })
}

const updatePurchaseHandler = async (req, res) => {
  const data = req.body;
  const id = req.params.id
  const response = await PurchaseService.updatePurchase(id, data)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: SUCCESS.PURCHASE.UPDATE_SUCCESS, error: response.err })
}

const getPurchasesHandler = async (req, res) => {
  const response = await PurchaseService.getPurchases(req.query)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: response.data, error: response.err })
}

const getPurchaseHandler = async (req, res) => {
  const purId = req.params.id
  const response = await PurchaseService.getPurchaseById(purId)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: response.data, error: response.err })
}

const deletePurchaseHandler = async (req, res) => {
  const id = req.params.id //purchase id
  let resp = await PurchaseService.getPurchaseById(id)
  const purchaseData = resp.data
  const [response1, response2] = await Promise.all([await PurchaseService.deletePurchase(id), await INTERNAL_SERVICE.PRODUCTS.updateProductQnty(purchaseData.pId, { qnty: -purchaseData.qnty })])
  if (response1.err || response2.err)
    res.status(500).json({ data: null, error: { err1: response1.err, err2: response2.err } })
  else
    res.status(200).json({ data: SUCCESS.PURCHASE.DELETE_SUCCESS, error: null });
}

const PurchaseController = {
  addPurchaseHandler, updatePurchaseHandler,
  getPurchaseHandler, getPurchasesHandler, deletePurchaseHandler
}

module.exports = PurchaseController