const INTERNAL_SERVICE = require("../InternalService");
const TradeService = require("../services/trade");

const getTradeHandler = async (req, res) => {
  if (!req.query.duration && !req.query.custom)
    return res.status(400).json({ data: null, error: "Empty query" })

  //no need to wait for its response therefor await is not used
  INTERNAL_SERVICE.TRADE.udpatePreviousMonthTrde()

  const response = await TradeService.getTradeAnalysis(req.query)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: response.data, error: null })
}

const PatientController = {
  getTradeHandler
}

module.exports = PatientController