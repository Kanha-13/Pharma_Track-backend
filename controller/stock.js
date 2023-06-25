const INTERNAL_SERVICE = require("../InternalService");
const SUCCESS = require("../constants/successMessage");
const StockService = require("../services/stock");

const addStockHandler = async (req, res) => {
  const data = req.body;
  const [response1, response2] = await Promise.all([await StockService.addStock(data), await INTERNAL_SERVICE.updateProduct(data)])
  if (response1.err || response2.err)
    res.status(500).json({ data: null, error: { err1: response1.err, err2: response2.err } })
  else
    res.status(201).json({ data: SUCCESS.STOCK.ADD_SUCCESS, error: null })
}

const updateStockHandler = async (req, res) => {
  const data = req.body.data;
  const response = await StockService.updateStock(data)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: SUCCESS.STOCK.ADD_SUCCESS, error: response.err })
}

const getStockHandler = async (req, res) => {
  const pId = req.params.pId
  const response = await StockService.getStock(pId)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: response.data, error: response.err })
}

const getStockInitialsHandler = async (req, res) => {
  const response = await StockService.getStockInitials(req.query.key)
  if (response.err)
    res.status(500).json({ data: null, error: data.err })
  else
    res.status(200).json({ data: response.data, error: response.err });
}

const StockController = { addStockHandler, updateStockHandler, getStockHandler, getStockInitialsHandler }

module.exports = StockController