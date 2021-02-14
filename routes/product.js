const product = require('../controller/product');
const router = require('express-promise-router')();
const auth = require('../middleware/is_auth')

// router.route('/')
//   .get((req,res)=>{
//     res.send("Server is Running....")
//   })
router.route('/product')
    .get(auth,product.findProd)
    .post(auth,product.addProd)
router.route('/product/nearExp')
  .post(auth,product.nearExp)
router.route('/product/toCart')
  .post(auth,product.toCart)

//this route will reduce stock or updat stock and saves the bill of particular user
router.route('/product/reduceStock')
  .post(auth,product.reduceStock)
router.route('/product/OldBill')
  .post(auth,product.oldBill)
module.exports = router;