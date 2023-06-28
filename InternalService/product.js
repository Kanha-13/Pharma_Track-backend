const Product = require("../models/product")

const updateProduct = async (id,data) => {
  try {
    const response = await Product.updateOne({ _id: id }, data)
    return { data: response, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const updateProductQnty = async (id,data) => {
  console.log(data)
  try {
    const response = await Product.updateOne({ _id: id }, { $inc: { qnty: data.qnty } })
    return { data: response, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const PRODUCTS = {
  updateProduct,
  updateProductQnty
}

module.exports =  PRODUCTS;