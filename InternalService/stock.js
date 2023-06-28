const Stock = require("../models/stock")

const updateStock = async (id,data) => {
  try {
    const response = await Stock.updateOne({ _id: id }, data)
    return { data: response, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const updateStockQnty = async (id,data) => {
  try {
    const res = await Stock.updateOne({ _id: id }, { $inc: { qnty: data.qnty } });
    return { data: res, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const STOCKS = {
  updateStock,
  updateStockQnty
}

module.exports = STOCKS;