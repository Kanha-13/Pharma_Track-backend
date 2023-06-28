const INTERNAL_SERVICE = require("../InternalService");
const Product = require("../models/product");
const Stock = require("../models/stock")
const mongoose = require('mongoose');


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
      return INTERNAL_SERVICE.STOCKS.incrementStockQnty(id, data)
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
    const response = await Stock.updateOne({ _id: id }, data)
    return { data: response, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const getStockById = async (id) => {
  try {
    const res = await Stock.findById(id);
    return { data: res, err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const getStock = async (pId) => {
  try {
    const res = await Stock.aggregate([
      { $match: { pId: mongoose.Types.ObjectId(pId) } },
      {
        $lookup: {
          from: 'vendors',
          localField: 'vId',
          foreignField: '_id',
          as: 'vendorDetail'
        }
      }
    ]);
    return { data: res, err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const getExpiryStock = async (date) => {
  try {
    let query = {};
    if (date.from)
      query = { expDate: { $lte: new Date(date.to), $gt: new Date(date.from) }, qnty: { $gt: 0 }, status: "ACTIVE" }
    else
      query = { expDate: { $lte: new Date(date.to) }, qnty: { $gt: 0 }, status: "ACTIVE" }
    const res = await Stock.aggregate([
      {
        $match: query
      },
      {
        $lookup: {
          from: "products",
          localField: "pId",
          foreignField: "_id",
          as: "productDetail"
        }
      },
      {
        $lookup: {
          from: 'vendors',
          localField: 'vId',
          foreignField: '_id',
          as: 'vendorDetail'
        }
      },
    ]);
    return { data: res, err: null }
  } catch (error) {
    console.log(error)
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

const deleteStock = async (id) => {
  try {
    const response = await Stock.deleteOne({ _id: id })
    return { data: response, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const StockService = { addStock, updateStock, getStock, getStockInitials, getExpiryStock, deleteStock, getStockById }


module.exports = StockService