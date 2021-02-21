const product = require('../controller/product');
const router = require('express-promise-router')();
const auth = require('../middleware/is_auth')

router.route('/product').get(product.findProd).post(product.addProd)
router.route('/deleteProd').post(product.deleteProd)  
router.route('/product/nearExp').post(product.nearExp)
router.route('/product/toCart').post(product.toCart)
//this route will reduce stock or updat stock and saves the bill of particular user and update sale profit
router.route('/product/reduceStock').post(product.reduceStock)

module.exports = router;