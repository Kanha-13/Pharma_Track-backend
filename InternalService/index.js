const PRODUCTS = require("./product");
const STOCKS = require('./stock')
const INTERNAL_SERVICE = {
  PRODUCTS: PRODUCTS,
  STOCKS:STOCKS
}

module.exports = INTERNAL_SERVICE;