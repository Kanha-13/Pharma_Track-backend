const INTERNAL_SERVICE = require("../InternalService");
const SUCCESS = require("../constants/successMessage");
const PurchaseService = require("../services/purchase");
const { analyseParentCategory } = require("../utils/billing");
const { mergeBillsInOne } = require("../utils/purchase");

const addPurchaseHandler = async (req, res) => {
  let data = req.body;
  const response1 = await PurchaseService.addPurchase(data)
  if (response1.err)
    return res.status(500).json({ data: null, error: response1.err })

  const categoryReport = analyseParentCategory(data.productsDetail)
  data.billInfo.categoryWisePurchase = categoryReport //in rupees

  data.productsDetail = data.productsDetail.map((prod) => {
    if (prod.category === "TABLET")
      return { ...prod, qnty: (parseInt(prod.qnty) + parseInt(prod.free) || 0) * parseInt(prod.pkg) }
    else return { ...prod, qnty: parseInt(prod.qnty) + parseInt(prod.free) || 0 }
  })

  const [response2, response3, response4] = await Promise.all([
    await INTERNAL_SERVICE.PRODUCTS.updateMultipleProductsQnty(data.productsDetail),
    await INTERNAL_SERVICE.STOCKS.addMultipleStocks(data.productsDetail),
    await INTERNAL_SERVICE.TRADE.updateOnePurchaseTrade(data.billInfo.purDate, data),
  ])

  if (response2.err || response3.err || response4.err)
    return res.status(500).json({ data: null, error: { err2: response2.err, err3: response3.err, err4: response4.err } })

  if (data.billInfo.paymentType === "CHALAN" || data.billInfo.paymentType === "CREDIT") {
    const response5 = await INTERNAL_SERVICE.VENDOR.updateVendor(data.billInfo.vId, { $inc: { balance: data.billInfo.totalAmt } })
    if (response5.err)
      return res.status(500).json({ data: null, error: { err5: response5.err } })
  }

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

const addPurchaseCNHandler = async (req, res) => {
  const data = req.body;
  const response = await PurchaseService.addPurchaseCN(data)

  if (response.err)
    res.status(500).json({ data: null, error: response.err })

  data.productsDetail.map((prod) => {
    prod.qnty = - prod.qnty * prod.pkg // to decrement the quantity of stocks from Product and Stocks collection
  })

  const [response2, response3] = await Promise.all([
    await INTERNAL_SERVICE.PRODUCTS.updateMultipleProductsQnty(data.productsDetail),
    await INTERNAL_SERVICE.STOCKS.addMultipleStocks(data.productsDetail),
  ])

  if (response2.err || response3.err)
    return res.status(500).json({ data: null, error: { err2: response2.err, err3: response3.err } })


  res.status(200).json({ data: response.data, error: response.err })


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

const billPaymentHandler = async (req, res) => {
  const { vId, bills, paymentDetail, billType } = req.body
  if (billType === "CHALAN") {
    const response1 = await PurchaseService.getPurchases({ ids: bills })
    if (response1.err)
      return res.status(500).json({ data: null, error: response1.err })

    const mergedBill = mergeBillsInOne(response1.data, paymentDetail)
    if (mergedBill.err)
      return res.status(500).json({ data: null, error: mergedBill.err })

    const response2 = await PurchaseService.addPurchase(mergedBill.data)
    if (response2.err)
      return res.status(500).json({ data: null, error: response2.err })


    const [response3, response4, response5] = await Promise.all([
      await PurchaseService.deletePurchases(bills),
      await INTERNAL_SERVICE.VENDOR.updateVendor(vId, { $inc: { balance: -paymentDetail.amtPaid } }),
      await INTERNAL_SERVICE.TRADE.updateOneTradeCreditAndLoss(paymentDetail.paymentDate, { creditPaidOff: paymentDetail.amtPaid })
    ])
    if (response3.err || response4.err || response5.err)
      return res.status(500).json({ data: null, error: { err3: response3.err, err4: response4.err, err5: response5.err } })

    return res.status(201).json({ data: "Payment recorded, challans deleted new bill updated", error: null })
  }
  else {
    const data = {
      paymentDate: paymentDetail.paymentDate,
      paymentId: paymentDetail.paymentId,
      paymentType: paymentDetail.paymentMode,
    }
    const [response1, response2] = ([
      await PurchaseService.updatePurchases(bills, data),
      await INTERNAL_SERVICE.TRADE.updateOneTradeCreditAndLoss(paymentDetail.paymentDate, { creditPaidOff: paymentDetail.amtPaid })
    ])
    if (response1.err || response2.err)
      return res.status(500).json({ data: null, error: { err1: response1.err, err2: response2.err } })

    return res.status(200).json({ data: "Payment recorded", error: null })

  }
}

const PurchaseController = {
  addPurchaseHandler, addPurchaseCNHandler, updatePurchaseHandler, billPaymentHandler,
  getPurchaseHandler, getPurchasesHandler, deletePurchaseHandler
}

module.exports = PurchaseController