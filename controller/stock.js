const SUCCESS = require("../constants/successMessage");
const StockService = require("../services/stock");

const addStockHandler = async (req, res) => {
  const data = req.body.data;
  const response = await StockService.addStock(data)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(201).json({ data: SUCCESS.STOCK.ADD_SUCCESS, error: response.err })
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
  const pId =  req.params.pId 
  const response = await StockService.getStock(pId)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(500).json({ data: response.data, error: response.err })
}

const StockController = { addStockHandler, updateStockHandler, getStockHandler }

module.exports = StockController