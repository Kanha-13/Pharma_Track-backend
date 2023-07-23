const Product = require("../models/product")
const { upperCase, trimWhiteSpaces } = require("../utils/dataFormater")

const checkProdDuplicate = async (data) => {
  return new Promise((resolve, reject) => {
    Product.findOne({ itemName: data.itemName, pkg: data.pkg }).then((res) => {
      if (res)
        return resolve(true)
      else
        return resolve(false)
    })
  })
}

const addProduct = async (data) => {
  data = trimWhiteSpaces(data)
  data = upperCase(data)
  try {
    const check = await checkProdDuplicate(data)
    if (!check) {
      const res = await Product.create(data)
      return { data: res, err: null }
    } else
      return { data: null, err: "DUPLICATE ENTRY" }
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
const getAllProduct = async () => {
  try {
    const res = await Product.find({})
    return { data: res, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}
const getProductQuery = async (query) => {
  const queries = Object.keys(query)
  if (queries.length)
    try {
      const res = await Product.find({ [queries[0]]: { $lte: query[queries[0]] } })
      return { data: res, err: null }
    } catch (error) {
      return { data: null, err: error }
    }
  else
    return { data: null, err: "Empty query" }
}
const deleteProd = async (pId) => {
  try {
    const res = await Product.deleteOne({ _id: pId })
    return { data: res, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const ProductService = { addProduct, updateProduct, getProductQuery, deleteProd, getAllProduct }


module.exports = ProductService