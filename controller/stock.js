const INTERNAL_SERVICE = require("../InternalService");
const SUCCESS = require("../constants/successMessage");
const StockService = require("../services/stock");

const addStockHandler = async (req, res) => {
  const data = req.body;
  const [response1, response2] = await Promise.all([await StockService.addStock(data), await INTERNAL_SERVICE.PRODUCTS.updateProductQnty(data.pId, { qnty: data.qnty })])
  if (response1.err || response2.err)
    res.status(500).json({ data: null, error: { err1: response1.err, err2: response2.err } })
  else
    res.status(201).json({ data: SUCCESS.STOCK.ADD_SUCCESS, error: null })
}

const updateStockHandler = async (req, res) => {
  const data = req.body;
  const id = req.params.id
  const response = await StockService.updateStock(id, data)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: SUCCESS.STOCK.UPDATE_SUCCESS, error: response.err })
}

const getStockHandler = async (req, res) => {
  const id = req.params.pId
  const response = await StockService.getStockById(id)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: response.data, error: response.err })
}
const getStockQueryHandler = async (req, res) => {
  const query = req.query
  const response = await StockService.getStockQuery(query)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: response.data, error: response.err })
}

const getExpiryStocksHandler = async (req, res) => {
  const from = req.query.from
  const to = req.query.to
  const response = await StockService.getExpiryStock({ from, to })
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

const deleteStockHandler = async (req, res) => {
  const id = req.params.id //stock id
  let resp = await StockService.getStockById(id)
  const stockData = resp.data
  const [response1, response2] = await Promise.all([await StockService.deleteStock(id), await INTERNAL_SERVICE.PRODUCTS.updateProductQnty(stockData.pId, { qnty: -stockData.qnty })])
  if (response1.err || response2.err)
    res.status(500).json({ data: null, error: { err1: response1.err, err2: response2.err } })
  else
    res.status(200).json({ data: SUCCESS.STOCK.DELETE_SUCCESS, error: null });
}

const getStocksValuationHandler = async (req, res) => {
  const response = await StockService.getStocksValuation()
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: response.data, error: response.err });
}

const StockController = {
  addStockHandler, updateStockHandler,
  getStockHandler, getStockQueryHandler, getStockInitialsHandler, deleteStockHandler,
  getExpiryStocksHandler, getStocksValuationHandler
}

module.exports = StockController