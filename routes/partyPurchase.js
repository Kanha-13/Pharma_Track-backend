const partyManage = require('../controller/partyPurchase')
const router = require('express-promise-router')();
const auth = require('../middleware/is_auth')


router.route('/partyManage').post(auth,partyManage.addNewParty)
router.route('/purchaseEntry').post(auth,partyManage.purchaseEntry)
router.route('/getPartyList').get(auth,partyManage.getPartyList)
router.route('/getCompanyList').get(auth,partyManage.getcompanyPartyList)
router.route('/updateCompanyList').post(auth,partyManage.updateCompanyList)
module.exports = router;