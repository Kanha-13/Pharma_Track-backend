const { API } = require('../constants/apis');
const CompanyController = require('../controller/company');
const router = require('express-promise-router')();
const auth = require('../middleware/is_auth');

router.route(API.ADD_COMPANY)
  .post(auth, CompanyController.addCompanyHandler)

router.route(API.GET_COMPANY)
  .get(auth, CompanyController.getCompanyHandler)

router.route(API.GET_COMPANYS)
  .get(auth, CompanyController.getCompaniesHandler)

router.route(API.UPDATE_COMPANY)
  .patch(auth, CompanyController.udpateCompanyHandler)

router.route(API.DELETE_COMPANY)
  .delete(auth, CompanyController.deleteCompanyHandler)

module.exports = router;