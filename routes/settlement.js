const { API } = require('../constants/apis');
const SettlementController = require('../controller/settlement');
const router = require('express-promise-router')();
const auth = require('../middleware/is_auth');

router.route(API.GET_SETTLEMENTS)
  .get(auth, SettlementController.getSettlementsHandler)

router.route(API.ADD_SETTLEMENT)
  .post(auth, SettlementController.addSettlementHandler)

router.route(API.UPDATE_SETTLEMENT)
  .patch(auth, SettlementController.updateSettlementHandler)

router.route(API.DELETE_SETTLEMENT)
  .delete(auth, SettlementController.deleteSettlementHandler)

module.exports = router;