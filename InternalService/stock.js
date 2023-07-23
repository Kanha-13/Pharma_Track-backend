const Stock = require("../models/stock")

const updateStock = async (id, data) => {
  try {
    const response = await Stock.updateOne({ _id: id }, data)
    return { data: response, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const addMultipleStocks = async (documents) => {
  try {
    const bulkOps = [];
    for (const document of documents) {
      // criteria for duplicate entries
      const duplicateCriteria = { pId: document.pId, batch: document.batch };

      // update operation
      let qnty = document.qnty
      delete document.qnty
      const updateOperation = {
        $setOnInsert: document,
        $inc: { qnty: qnty },
        status: "ACTIVE"
      };

      // update operation to the bulk operation
      bulkOps.push({
        updateOne: {
          filter: duplicateCriteria,
          update: updateOperation,
          upsert: true, // Insert if no match is found
          new: true
        },
      });
    }

    if (bulkOps.length > 0) {
      // Execute the bulk write operation
      const result = await Stock.bulkWrite(bulkOps);
      return { data: result, err: null }
    }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const updateMultipleStocksQnty = async (documents) => {
  try {
    const bulkOps = [];
    for (const document of documents) {
      // criteria for duplicate entries
      const duplicateCriteria = { $or: [{ _id: document.stockId }, { batch: document.batch }] };

      // update operation
      const updateOperation = {
        $inc: { qnty: document.qnty },
      };

      // update operation to the bulk operation
      bulkOps.push({
        updateOne: {
          filter: duplicateCriteria,
          update: updateOperation,
        },
      });
    }

    if (bulkOps.length > 0) {
      // Execute the bulk write operation
      const result = await Stock.bulkWrite(bulkOps);
      clearEmptyStocks()
      return { data: result, err: null }
    }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const updateStockQnty = async (id, data) => {
  try {
    const res = await Stock.updateOne({ _id: id }, { $inc: { qnty: data.qnty } });
    return { data: res, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const calculateValuation = async (stocks = []) => {
  let valuation = 0;
  stocks.map((stock) => {
    if (stock.productDetail.length())
      if (stock.productDetail[0].category === "TABLET")
        return valuation += ((stock.netRate || 0) / stock.productDetail[0].pkg) * stock.qnty
    valuation += (stock.netRate || 0) * stock.qnty
  })
  return valuation.toFixed(2);
}

const clearEmptyStocks = async () => {
  try {
    await Stock.deleteMany({ qnty: 0 })
    return { data: "Stock cleared", err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const STOCKS = {
  updateStock,
  clearEmptyStocks,
  updateStockQnty,
  addMultipleStocks,
  updateMultipleStocksQnty,
  calculateValuation
}

module.exports = STOCKS;