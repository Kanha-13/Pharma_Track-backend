const PRODUCTS = require("./product");
const BILLING = require('./billing')
const STOCKS = require('./stock')
const INTERNAL_SERVICE = {
  PRODUCTS: PRODUCTS,
  STOCKS:STOCKS,
  BILLING:BILLING
}

module.exports = INTERNAL_SERVICE;