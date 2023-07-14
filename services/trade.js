const Trade = require("../models/trade")

const getTradeAnalysis = async (query) => {
  let today = new Date()
  let searchQuery = {}


  if (query.duration)
    if (query.duration === "month") {
      searchQuery.from = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + "01"
      searchQuery.to = today.getFullYear() + "-" + (today.getMonth() + 2) + "-" + "01"
    }
    else {
      searchQuery.from = today.getFullYear() + "-" + "01" + "-" + "01"
      searchQuery.to = (today.getFullYear() + 1) + "-" + "01" + "-" + "01"
    }
  else if (query.custom) {
    searchQuery.from = query.custom.from
    searchQuery.to = query.custom.to
  }
  try {
    const res = await Trade.find({ date: { $lt: searchQuery.to, $gte: searchQuery.from } })
    return { data: res, err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const TradeService = { getTradeAnalysis }

module.exports = TradeService