const API = {
  ADD_STOCK: "/stock",
  GET_STOCKS_INITIALS: "/stocks/initials",
  GET_STOCK: "/stock/:pId",
  GET_EXPIRY_STOCKS: "/stocks/expiry",
  UDPATE_STOCK: "/stock",
  DELETE_STOCK: "/stock",

  ADD_VENDOR: "/vendor",
  UPDATE_VENDOR: "/vendor",
  GET_VENDORS: "/vendors",
  GET_VENDOR: "/vendor/:vId",
  DELETE_VENDOR: "/vendor/:vId",

  ADD_SETTLEMENT:"/settlement",
  GET_SETTLEMENTS:"/settlements",
  UPDATE_SETTLEMENT:"/settlement/:id",
  DELETE_SETTLEMENT:"/settlement/:id"
}
module.exports = { API }