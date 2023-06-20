const { API } = require('../constants/apis');
const StockController = require('../controller/stock')
const router = require('express-promise-router')();
const auth = require('../middleware/is_auth')

router.route(API.GET_STOCK)
  .get(auth, StockController.getStockHandler)
  .post(auth, StockController.addStockHandler)
  .patch(auth, StockController.updateStockHandler)

module.exports = router;