const API = {

  WAKE_UP_SERVER: "/wakeup",

  GET_PRODUCT_QUERY: "/product/query",
  ADD_PRODUCT: "/product",
  GET_PRODUCT_INITIAL: '/product/initials',
  GET_ALL_PRODUCTS: '/products',
  GET_PRODUCT: "",
  DELETE_PRODUCT: "/product",
  UPDATE_PRODUCT: "/product",

  ADD_STOCK: "/stock",
  GET_STOCKS_INITIALS: "/stocks/initials",
  GET_STOCK: "/stock/:pId",
  GET_STOCKS_QUERY: "/stocks/query",
  GET_EXPIRY_STOCKS: "/stocks/expiry",
  UDPATE_STOCK: "/stock/:id",
  DELETE_STOCK: "/stock/:id",
  GET_STOCKS_VALUATION: "/stocks/valuation",

  ADD_VENDOR: "/vendor",
  UPDATE_VENDOR: "/vendor",
  GET_VENDORS: "/vendors",
  GET_VENDORS_QUERY: "/vendors/query",
  GET_VENDOR: "/vendor/:vId",
  DELETE_VENDOR: "/vendor/:vId",

  ADD_SETTLEMENT: "/settlement",
  GET_SETTLEMENTS: "/settlements",
  UPDATE_SETTLEMENT: "/settlement/:id",
  DELETE_SETTLEMENT: "/settlement/:id",

  ADD_PURCHASE: '/purchase',
  ADD_PURCHASE_CN: '/purchase/cn',
  GET_PURCHASES: '/purchases',
  GET_PURCHASE_DETAIL: '/purchase/:id',
  UPDATE_PURCHASE: '/purchase/:id',
  DELETE_PURCHASE: '/purchase/:id',
  BILL_PAYMENT_PURCHASE: '/purchase/bill/payment',

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
  PATIENT_BILL_PAYMENT: '/patient/bill/payment',

  //trade analysis
  GET_TRADE_REPORT: "/trade/analysis",

  //company
  ADD_COMPANY: "/company",
  GET_COMPANY: "/company/:id",
  UPDATE_COMPANY: "/company/:id",
  DELETE_COMPANY: "/company/:id",
  GET_COMPANYS: "/companys",
  GET_COMPANYS_QUERY: "/companys/query",
}
module.exports = { API }