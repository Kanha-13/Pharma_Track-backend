const Product = require("../models/product");
const Stock = require("../models/stock")

const checkDuplicate = async (data) => {
  return new Promise((resolve, reject) => {
    Stock.findOne({ pId: data.pId, batch: data.batch }).then((res) => {
      if (res)
        return resolve(res._id)
      else
        return resolve(false)
    })
  })
}

const addStock = async (data) => {
  try {
    const id = await checkDuplicate(data);
    if (id) {//if true means entry already exist therefore just update the stock, not create new enty
      return updateStock(id, data)
    } else {
      const res = await Stock.create(data);
      return { data: res, err: null }
    }
  } catch (error) {
    return { data: null, err: error }
  }
}

const updateStock = async (id, data) => {
  try {
    const res = await Stock.updateOne({ _id: id }, { $inc: { qnty: data.qnty } });
    return { data: res, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const getStock = async (pId) => {
  try {
    const res = await Stock.find({ pId: pId });
    return { data: res, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const getStockInitials = async (key) => {
  try {
    const res = await Product.aggregate([
      {
        $match: { itemName: { $regex: `^${key}`, $options: "i" } }
      },
      {
        $lookup:
        {
          from: 'stocks',
          localField: '_id',
          foreignField: 'pId',
          as: 'stockDetail'
        }
      }
    ]);

    return { data: res, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const StockService = { addStock, updateStock, getStock, getStockInitials }


module.exports = StockService