const { API } = require('../constants/apis');
const BillController = require('../controller/billing');
const router = require('express-promise-router')();
const auth = require('../middleware/is_auth');

// router.route(API.GET_STOCKS_INITIALS)
//   .get(auth, StockController.getStockInitialsHandler)

router.route(API.GET_BILLING_HISTORY)
  .get(auth, BillController.getBillsHandler)

router.route(API.GET_BILLING_INFO)
  .get(auth, BillController.getBillHandler)

router.route(API.BILLING_CHECKOUT)
  .post(auth, BillController.addBillHandler)

// router.route(API.UDPATE_STOCK)
//   .patch(auth, StockController.updateStockHandler)

// router.route(API.DELETE_STOCK)
//   .delete(auth, StockController.deleteStockHandler)

module.exports = router;