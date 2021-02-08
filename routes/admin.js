const adminAuth = require('../controller/admin');
const router = require('express-promise-router')();

//login the admin
router.route('/login')
    .post(adminAuth.login)
//render the web site
router.route('/')
    .get((req,res)=>{
        res.render('agrawalMedical')
    })
//clear the cookie
router.route('/logOut')
    .post((req,res)=>{
        res.clearCookie('***REMOVED***');
        res.end("done")
    })    
module.exports = router;