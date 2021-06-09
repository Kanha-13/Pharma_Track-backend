const adminAuth = require('../controller/admin');
const router = require('express-promise-router')();

router.route('/adminLogin').post(adminAuth.login)
router.route('/adminSignUp').post(adminAuth.signUp)
//render the web site or forntend
router.route('/').get((req, res) => { res.render('agrawalMedical') })
//clear the cookie
router.route('/logOut').post((req, res) => { res.clearCookie(process.env.TOKEN_NAME); res.status(200).send("done") })
module.exports = router;