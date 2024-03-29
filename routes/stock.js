const { API } = require('../constants/apis');
const StockController = require('../controller/stock');
const router = require('express-promise-router')();
const auth = require('../middleware/is_auth');

router.route(API.GET_STOCKS_INITIALS)
  .get(auth, StockController.getStockInitialsHandler)

router.route(API.GET_EXPIRY_STOCKS)
  .get(auth, StockController.getExpiryStocksHandler)

router.route(API.GET_STOCK)
  .get(auth, StockController.getStockHandler)

router.route(API.GET_STOCKS_QUERY)
  .get(auth, StockController.getStockQueryHandler)

router.route(API.ADD_STOCK)
  .post(auth, StockController.addStockHandler)

router.route(API.UDPATE_STOCK)
  .patch(auth, StockController.updateStockHandler)

router.route(API.DELETE_STOCK)
  .delete(auth, StockController.deleteStockHandler)

router.route(API.GET_STOCKS_VALUATION)
  .get(auth, StockController.getStocksValuationHandler)

module.exports = router;