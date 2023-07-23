const { API } = require('../constants/apis');
const PurchaseController = require('../controller/purchase');
const router = require('express-promise-router')();
const auth = require('../middleware/is_auth');

router.route(API.GET_PURCHASES)
  .get(auth, PurchaseController.getPurchasesHandler)

router.route(API.GET_PURCHASE_DETAIL)
  .get(auth, PurchaseController.getPurchaseHandler)

router.route(API.ADD_PURCHASE)
  .post(auth, PurchaseController.addPurchaseHandler)

router.route(API.BILL_PAYMENT_PURCHASE)
  .post(auth, PurchaseController.billPaymentHandler)

router.route(API.UPDATE_PURCHASE)
  .patch(auth, PurchaseController.updatePurchaseHandler)

router.route(API.DELETE_PURCHASE)
  .delete(auth, PurchaseController.deletePurchaseHandler)

module.exports = router;