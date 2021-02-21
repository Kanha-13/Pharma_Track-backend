const salePur = require('../controller/salePurchase');
const router = require('express-promise-router')();
const auth = require('../middleware/is_auth')

router.route('/sellPurReport').post(salePur.sellPurReport)
router.route('/partyPurchaseHistory').post(salePur.partyPuchaseHistory)

module.exports = router;