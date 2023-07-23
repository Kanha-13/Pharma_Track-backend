const { API } = require('../constants/apis');
const ProductController = require('../controller/product');
const router = require('express-promise-router')();
const auth = require('../middleware/is_auth')

router.route(API.ADD_PRODUCT).post(auth, ProductController.addProdHandler)

router.route(API.GET_PRODUCT_INITIAL).get(auth, ProductController.getProdWithInitialsHandler)
router.route(API.GET_ALL_PRODUCTS).get(auth, ProductController.getAllProductsHandler)
router.route(API.GET_PRODUCT_QUERY).get(auth, ProductController.getProductQueryHandler)

router.route('/product').get(auth, ProductController.findProdHandler)
router.route(API.UPDATE_PRODUCT).patch(auth, ProductController.udpateProductHandler)
router.route(API.DELETE_PRODUCT).delete(auth, ProductController.deleteProdHandler)

module.exports = router;