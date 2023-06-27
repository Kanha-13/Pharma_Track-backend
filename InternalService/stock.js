const Stock = require("../models/stock")

const updateStock = async (id,data) => {
  try {
    const response = await Stock.updateOne({ _id: id }, data)
    return { data: response, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

module.exports = updateStock;