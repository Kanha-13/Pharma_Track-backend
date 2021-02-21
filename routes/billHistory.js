const billHistory = require('../controller/billHistoty')
const router = require('express-promise-router')();
const auth = require('../middleware/is_auth')

router.route('/patient/billHistory').post(billHistory.getBillHistory)
router.route('/patient/renderBill').post(billHistory.renderBill)
router.route('/patient/OldBill').post(billHistory.oldBillPrint)
module.exports = router;