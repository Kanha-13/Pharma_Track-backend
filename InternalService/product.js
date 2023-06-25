const Product = require("../models/product")

const updateProduct = async (data) => {
  try {
    const response = await Product.updateOne({ _id: data.pId }, { $inc: { qnty: data.qnty } })
    return { data: response, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

module.exports = updateProduct;