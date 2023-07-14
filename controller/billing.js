const INTERNAL_SERVICE = require("../InternalService");
const SUCCESS = require("../constants/successMessage");
const BillService = require("../services/billing");

const addBillHandler = async (req, res) => {
  let data = req.body;
  const response1 = await BillService.addBill(data)
  if (response1.err)
    return res.status(500).json({ data: null, err1: response1.err })

  data.productsDetail.map((prod) => {
    // console.log(prod)
    prod.qnty = - prod.soldQnty // to decrement the quantity of stocks from Product and Stocks collection
  })
  const [response2, response3, response4, response5] = await Promise.all([
    await INTERNAL_SERVICE.PRODUCTS.updateMultipleProductsQnty(data.productsDetail),
    await INTERNAL_SERVICE.STOCKS.updateMultipleStocksQnty(data.productsDetail),
    await INTERNAL_SERVICE.BILLING.updateCN(data.billInfo.cnId, { status: "REFUNDED" }),
    await INTERNAL_SERVICE.TRADE.updateOneSaleTrade(data.billInfo.billingDate, data)
  ])

  if (response2.err || response3.err || response4.err || response5.err)
    res.status(500).json({ data: null, error: { err2: response2.err, err3: response3.err, err4: response4.err, err5: response5.err } })
  else
    res.status(201).json({ data: response1.data, error: null })
}

const updateBillHandler = async (req, res) => {
  const data = req.body;
  const id = req.params.id
  const response = await BillService.updateBill(id, data)
  if (response.err)
    return res.status(500).json({ data: null, error: response.err })

  const [response2, response3, updatedBill] = await Promise.all([
    await INTERNAL_SERVICE.PRODUCTS.updateMultipleProductsQnty(data.removedItem),
    await INTERNAL_SERVICE.STOCKS.updateMultipleStocksQnty(data.removedItem),
    await BillService.getBillById(id)
  ])

  if (response2.err || response3.err || updatedBill.err)
    res.status(500).json({ data: null, error: { err2: response2.err, err3: response3.err, updatedBillGet: updatedBill.err } })
  else
    res.status(201).json({ data: updatedBill.data, error: null })
}

const getBillsHandler = async (req, res) => {
  const response = await BillService.getBillQuery(req.query)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: response.data, error: response.err })
}

const getCNsHandler = async (req, res) => {
  const response = await BillService.getCNQuery(req.query)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: response.data, error: response.err })
}

const getBillHandler = async (req, res) => {
  const billingId = req.params.id
  const response = await BillService.getBillById(billingId)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: response.data, error: response.err })
}

const getLastBillingHandler = async (req, res) => {
  const query = req.query
  const response = await BillService.getLastBill(query)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: response.data, error: response.err })
}

const getCNHandler = async (req, res) => {
  const cnId = req.params.id
  const response = await BillService.getCNById(cnId)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: response.data, error: response.err })
}
const deleteCNHandler = async (req, res) => {
  const cnId = req.params.id
  const response = await BillService.deleteCNById(cnId)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: response.data, error: response.err })
}

const cancelBillHandler = async (req, res) => {
  try {
    const newBillData = req.body;
    const billId = req.params.id
    const oldBillData = await BillService.getBillById(billId)
    const response1 = await BillService.updateBill(billId, { ...newBillData.billInfo, productsDetail: newBillData.productsDetail })
    if (oldBillData.err || response1.err)
      res.status(500).json({ data: null, errors: { oldBillFetch: oldBillData.err, updateBill: response1.err } })
    else {
      // updating returned products
      let qntyToUpdate = oldBillData.data.productsDetail.map((prod, index) => {
        return { pId: prod.pId, qnty: prod.soldQnty, batch: prod.batch }
      })
      const [response2, response3, updatedBill] = await Promise.all([
        await INTERNAL_SERVICE.PRODUCTS.updateMultipleProductsQnty(qntyToUpdate),
        await INTERNAL_SERVICE.STOCKS.updateMultipleStocksQnty(qntyToUpdate),
        await BillService.getBillById(billId)
      ])

      if (response2.err || response3.err || updatedBill.err)
        res.status(500).json({ data: null, error: { err2: response2.err, err3: response3.err, err4: updatedBill.err } })
      else {
        //updating stocks for newbill products
        let newProdQnty = newBillData.productsDetail.map((prod) => {
          return { pId: prod.pId, batch: prod.batch, qnty: - prod.soldQnty }
        })
        const [response4, response5] = await Promise.all([
          await INTERNAL_SERVICE.PRODUCTS.updateMultipleProductsQnty(newProdQnty),
          await INTERNAL_SERVICE.STOCKS.updateMultipleStocksQnty(newProdQnty)
        ])
        if (response4.err || response5.err)
          res.status(500).json({ data: null, error: { err4: response4.err, err5: response5.err } })
        else
          res.status(201).json({ data: updatedBill.data, error: null })
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ data: null, error: error })
  }
}

const addCNHandler = async (req, res) => {
  let data = req.body;
  data.productsDetail.map((prod) => {
    prod.returnedQnty = prod.qnty = prod.soldQnty // to res-stock the quantity of stocks from Product and Stocks collection
  })

  const response1 = await BillService.addCN(data)
  if (response1.err)
    return res.status(500).json({ data: null, err1: response1.err })


  const [response2, response3] = await Promise.all([
    await INTERNAL_SERVICE.PRODUCTS.updateMultipleProductsQnty(data.productsDetail),
    await INTERNAL_SERVICE.STOCKS.updateMultipleStocksQnty(data.productsDetail)
  ])

  if (response2.err || response3.err)
    res.status(500).json({ data: null, error: { err2: response2.err, err3: response3.err } })
  else
    res.status(201).json({ data: response1.data, error: null })
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
  addBillHandler, updateBillHandler, cancelBillHandler, addCNHandler, deleteCNHandler,
  getBillHandler, getBillsHandler, deleteBillHandler, getCNsHandler, getCNHandler, getLastBillingHandler
}

module.exports = BillController