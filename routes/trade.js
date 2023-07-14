const { API } = require('../constants/apis');
const TradeController = require('../controller/trade');
const router = require('express-promise-router')();
const auth = require('../middleware/is_auth');

router.route(API.GET_TRADE_REPORT)
  .get(auth, TradeController.getTradeHandler)

module.exports = router;