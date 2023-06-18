const product = require('../controller/product');
const router = require('express-promise-router')();
const auth = require('../middleware/is_auth')

router.route('/product/initials').get(auth, product.getProfWithInitials)


router.route('/product').get(auth, product.findProd).post(auth, product.addProd)
router.route('/deleteProd').post(auth, product.deleteProd)
router.route('/product/nearExp').post(auth, product.nearExp)
router.route('/product/goingOutOfStock').get(auth, product.goingOutOfStock)
router.route('/invoice/count').get(auth, product.getInvoiceNumber)
router.route('/product/toCart').post(auth, product.toCart)
//this route will reduce stock or updat stock and saves the bill of particular user and update sale profit
router.route('/product/reduceStock').post(auth, product.reduceStock)

module.exports = router;