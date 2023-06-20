const Product = require("../models/product")
const { upperCase, trimWhiteSpaces } = require("../utils/dataFormater")

const addProduct = async (data) => {
  data = trimWhiteSpaces(data)
  data = upperCase(data)
  try {
    const res = await Product.create(data)
    return { data: res, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}
const updateProduct = async (pId, data) => {
  data = trimWhiteSpaces(data)
  data = upperCase(data)
  try {
    const res = await Product.updateOne({ _id: pId }, data)
    return { data: res, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}
const getProduct = async () => {

}

const ProductService = { addProduct, updateProduct, getProduct }


module.exports = ProductService