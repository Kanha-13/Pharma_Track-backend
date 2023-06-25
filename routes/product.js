const ProductController = require('../controller/product');
const router = require('express-promise-router')();
const auth = require('../middleware/is_auth')



router.route('/product/initials').get(auth, ProductController.getProdWithInitialsHandler)

router.route('/product')
  .get(auth, ProductController.findProdHandler)
  .post(auth, ProductController.addProdHandler)
  .patch(auth, ProductController.udpateProductHandler)
  .delete(auth, ProductController.deleteProdHandler)



// router.route('/deleteProd').post(auth, ProductController.deleteProdHandler)
router.route('/product/nearExp').post(auth, ProductController.nearExpiryHandler)
router.route('/product/goingOutOfStock').get(auth, ProductController.goingOutOfStockHandler)
router.route('/invoice/count').get(auth, ProductController.getInvoiceNumberHandler)
router.route('/product/toCart').post(auth, ProductController.toCartHandler)
//this route will reduce stock or updat stock and saves the bill of particular user and update sale profit
router.route('/product/reduceStock').post(auth, ProductController.reduceStockHandler)

module.exports = router;