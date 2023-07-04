const { API } = require('../constants/apis');
const BillController = require('../controller/billing');
const router = require('express-promise-router')();
const auth = require('../middleware/is_auth');

// router.route(API.GET_STOCKS_INITIALS)
//   .get(auth, StockController.getStockInitialsHandler)

// router.route(API.GET_EXPIRY_STOCKS)
//   .get(auth, StockController.getExpiryStocksHandler)

router.route(API.BILLING_CHECKOUT)
  .post(auth, BillController.addBillHandler)

// router.route(API.UDPATE_STOCK)
//   .patch(auth, StockController.updateStockHandler)

// router.route(API.DELETE_STOCK)
//   .delete(auth, StockController.deleteStockHandler)

module.exports = router;