const Stock = require("../models/stock")

const addStock = async (data) => {
  try {
    const stock = new Stock(data)
    const res = await stock.create();
    return { data: res, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}
const updateStock = async () => {

}
const getStock = async () => {

}

const StockService = { addStock, updateStock, getStock }


module.exports = StockService