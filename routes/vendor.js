const { API } = require('../constants/apis');
const VendorHandler = require('../controller/vendor');
const router = require('express-promise-router')();
const auth = require('../middleware/is_auth');


router.route(API.GET_VENDOR)
  .get(auth,VendorHandler.getVendorHandler )

router.route(API.GET_VENDORS)
  .get(auth,VendorHandler.getVendorsHandler )

router.route(API.ADD_VENDOR)
  .post(auth, VendorHandler.addVendorHandler)

router.route(API.UPDATE_VENDOR)
  .patch(auth, VendorHandler.updateVendorHandler)

router.route(API.DELETE_VENDOR)
  .delete(auth, VendorHandler.deleteVendorHandler)

module.exports = router;