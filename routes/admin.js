const adminAuth = require('../controller/admin');
const router = require('express-promise-router')();

router.route('/login').post(adminAuth.login)
router.route('/signUp').post(adminAuth.signUp)
//render the web site
router.route('/').get((req,res)=>{res.render('agrawalMedical')})
//clear the cookie
router.route('/logOut').post((req,res)=>{res.clearCookie('***REMOVED***');res.status(200).send("done")})    
module.exports = router;