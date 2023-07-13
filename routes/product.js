const ProductController = require('../controller/product');
const router = require('express-promise-router')();
const auth = require('../middleware/is_auth')

router.route('/product/initials').get(auth, ProductController.getProdWithInitialsHandler)

router.route('/products')
  .get(auth,ProductController.getAllProductsHandler)

router.route('/product')
  .get(auth, ProductController.findProdHandler)
  .post(auth, ProductController.addProdHandler)
  .patch(auth, ProductController.udpateProductHandler)
  .delete(auth, ProductController.deleteProdHandler)
  
module.exports = router;