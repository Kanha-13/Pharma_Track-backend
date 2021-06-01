const userAuth = require('../controller/userAuth');
const router = require('express-promise-router')();

router.route('/userLogin').post(userAuth.login)
router.route('/userSignUp').post(userAuth.signUp)
router.route('/userOTPverification').post(userAuth.otpVerification)
//render the web site or forntend
router.route('/').get((req,res)=>{res.render('agrawalMedical')})
//clear the cookie
router.route('/logOut').post((req,res)=>{res.clearCookie('***REMOVED***');res.status(200).send("done")})    
module.exports = router;