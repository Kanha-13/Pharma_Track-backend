const { API } = require('../constants/apis');
const router = require('express-promise-router')();

router.route(API.WAKE_UP_SERVER)
  .get((req, res) => res.status(200).send("Thanks! client :)"))

module.exports = router;