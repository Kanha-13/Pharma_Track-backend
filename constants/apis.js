const API = {
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

  ADD_SETTLEMENT:"/settlement",
  GET_SETTLEMENTS:"/settlements",
  UPDATE_SETTLEMENT:"/settlement/:id",
  DELETE_SETTLEMENT:"/settlement/:id",

  ADD_PURCHASE: '/purchase',
  GET_PURCHASES: '/purchases',
  GET_PURCHASE_DETAIL: '/purchase/:id',
  UPDATE_PURCHASE: '/purchase/:id',
  DELETE_PURCHASE: '/purchase/:id',

  BILLING_CHECKOUT:'/billing/checkout',
}
module.exports = { API }