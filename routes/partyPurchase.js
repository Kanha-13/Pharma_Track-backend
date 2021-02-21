const partyManage = require('../controller/partyPurchase')
const router = require('express-promise-router')();
const auth = require('../middleware/is_auth')


router.route('/partyManage').post(partyManage.addNewParty)
router.route('/purchaseEntry').post(partyManage.purchaseEntry)
router.route('/getPartyList').get(partyManage.getPartyList)
router.route('/getCompanyList').get(partyManage.getcompanyPartyList)
router.route('/updateCompanyList').post(partyManage.updateCompanyList)
module.exports = router;