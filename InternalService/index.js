const updateProduct = require("./product");
const updateStock = require('./stock')
const INTERNAL_SERVICE = {
  updateProduct: updateProduct,
  updateStock:updateStock
}

module.exports = INTERNAL_SERVICE;