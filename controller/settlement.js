const INTERNAL_SERVICE = require("../InternalService");
const SUCCESS = require("../constants/successMessage");
const SettlementService = require("../services/settlement");

const addSettlementHandler = async (req, res) => {
  const data = req.body;
  const response = await SettlementService.addSettlement(data)
  const response2 = await INTERNAL_SERVICE.updateStock(data.sId, { status: "RETURNED" })
  console.log("update of stock",response2)
  if (response.err && response2.err)
    res.status(500).json({ data: null, error: { err1: response.err, err2: response2.err } })
  else
    res.status(201).json({ data: SUCCESS.SETTLEMENT.ADD_SUCCESS, error: response.err })
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