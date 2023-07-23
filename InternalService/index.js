const PRODUCTS = require("./product");
const TRADE = require('./trade')
const BILLING = require('./billing')
const STOCKS = require('./stock')
const VENDOR = require('./vendor')

const INTERNAL_SERVICE = {
  PRODUCTS: PRODUCTS,
  STOCKS: STOCKS,
  BILLING: BILLING,
  TRADE: TRADE,
  VENDOR: VENDOR,
}

module.exports = INTERNAL_SERVICE;