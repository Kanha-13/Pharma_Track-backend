const INTERNAL_SERVICE = require("../InternalService");
const SUCCESS = require("../constants/successMessage");
const SettlementService = require("../services/settlement");
const { calculateLoss } = require("../utils/settlement");

const addSettlementHandler = async (req, res) => {
  const data = req.body;
  const response = await SettlementService.addSettlement(data)
  if (response.err)
    return res.status(500).json({ data: null, error: response.err })

  const [response1, response2] = await Promise.all([
    await INTERNAL_SERVICE.STOCKS.updateStockQnty(data.sId, { qnty: -data.returnQnty }),
    await INTERNAL_SERVICE.PRODUCTS.updateProductQnty(data.pId, { qnty: -data.returnQnty })
  ])
  if (response1.err || response2.err)
    return res.status(500).json({ data: null, error: { err1: response1.err, err2: response2.err } })

  const [response3, resposne4] = await Promise.all([
    await INTERNAL_SERVICE.STOCKS.clearEmptyStocks(),
    await INTERNAL_SERVICE.TRADE.updateOneTradeCreditAndLoss(data.date, { totalLoss: calculateLoss(data) })
  ])
  if (response3.err || resposne4.err)
    return res.status(500).json({ data: null, error: { err3: response3.err, err4: resposne4.err } })

  res.status(201).json({ data: SUCCESS.SETTLEMENT.ADD_SUCCESS, error: null })
}

const updateSettlementHandler = async (req, res) => {
  const settlementId = req.params.id
  if (!settlementId) return res.status(400).json({ message: "settlement id missing" });
  const data = req.body
  const response = await SettlementService.updateSettlement(settlementId, data)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: SUCCESS.SETTLEMENT.UPDATE_SUCCESS, error: null })
}

const getSettlementsHandler = async (req, res) => {
  const response = await SettlementService.getSettlements()
  if (response.err)
    res.status(500).json({ data: null, error: data.err })
  else
    res.status(200).json({ data: response.data, error: response.err });
}

const deleteSettlementHandler = async (req, res) => {
  const settlementId = req.params.id
  if (!settlementId) return res.status(400).json({ message: "settlement id missing" });
  const data = req.body
  const response = await SettlementService.deleteSettlement(settlementId, data)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: SUCCESS.SETTLEMENT.DELETE_SUCCESS, error: null })
}

const SettlementController = {
  addSettlementHandler, updateSettlementHandler,
  getSettlementsHandler, deleteSettlementHandler
}

module.exports = SettlementController