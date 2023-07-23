const { API } = require('../constants/apis');
const PatientController = require('../controller/patient');
const router = require('express-promise-router')();
const auth = require('../middleware/is_auth');

router.route(API.GET_MEDICINE_HISTORY)
  .get(auth, PatientController.getMedicineHistoryHandler)

router.route(API.PATIENT_BILL_PAYMENT)
  .post(auth, PatientController.creditBillPayment)

module.exports = router;