const API = {

  GET_PRODUCT_QUERY: "/product/query",
  ADD_PRODUCT:"/product",
  GET_PRODUCT_INITIAL:'/product/initials',
  GET_ALL_PRODUCTS:'/products',
  GET_PRODUCT:"",
  DELETE_PRODUCT:"/product",
  UPDATE_PRODUCT:"/product",

  ADD_STOCK: "/stock",
  GET_STOCKS_INITIALS: "/stocks/initials",
  GET_STOCK: "/stock/:pId",
  GET_STOCKS_QUERY: "/stocks/query",
  GET_EXPIRY_STOCKS: "/stocks/expiry",
  UDPATE_STOCK: "/stock/:id",
  DELETE_STOCK: "/stock/:id",

  ADD_VENDOR: "/vendor",
  UPDATE_VENDOR: "/vendor",
  GET_VENDORS: "/vendors",
  GET_VENDOR: "/vendor/:vId",
  DELETE_VENDOR: "/vendor/:vId",

  ADD_SETTLEMENT: "/settlement",
  GET_SETTLEMENTS: "/settlements",
  UPDATE_SETTLEMENT: "/settlement/:id",
  DELETE_SETTLEMENT: "/settlement/:id",

  ADD_PURCHASE: '/purchase',
  GET_PURCHASES: '/purchases',
  GET_PURCHASE_DETAIL: '/purchase/:id',
  UPDATE_PURCHASE: '/purchase/:id',
  DELETE_PURCHASE: '/purchase/:id',

  BILLING_CHECKOUT: '/billing/checkout',
  GET_BILLING_INFO: '/billing/:id',
  GET_CN_INFO: '/billing/creditnote/:id',
  GET_BILLING_HISTORY: '/billings',
  DELETE_BILLING_CN: "/billing/creditnote/:id",
  GET_CN_HISTORY: '/billings/creditnotes',
  UPDATE_BILLING_INFO: "/billing/:id",
  ADD_BILLING_CN: "/billing/creditnote",
  CANCEL_BILLING: "/billing/:id",
  GET_LAST_BILLING: "/billing/last/query",

  //patients
  GET_MEDICINE_HISTORY: "/patient/medicines",

}
module.exports = { API }