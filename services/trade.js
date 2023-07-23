const Trade = require("../models/trade")
const TradeHistory = require("../models/tradeHistory")

const getTradeAnalysis = async (query) => {
  let today = new Date()
  let searchQuery = {}
  try {
    let res1 = [];
    let res2 = [];
    if (query.duration) {
      if (query.duration === "year") {
        let currentYear = today.getFullYear()
        searchQuery = { month: { $lte: 12, $gte: 1 }, year: currentYear }
        const [response1, response2] = await Promise.all([await Trade.find({}).sort({ date: 1 }), await TradeHistory.find(searchQuery).sort({ month: 1, year: 1 })])
        res1 = response1
        res2 = response2
      }
      else
        res1 = await Trade.find({}).sort({ date: 1 })
    }
    else if (query.fromMonth) {
      let fromMonth = query.fromMonth
      let toMonth = query.toMonth
      let fromYear = query.fromYear
      let toYear = query.toYear
      searchQuery = { month: { $lte: toMonth, $gte: fromMonth }, year: { $lte: toYear, $gte: fromYear } }
      if (toMonth >= (today.getMonth() + 1)) {
        const [response1, response2] = await Promise.all([await Trade.find({}), await TradeHistory.find(searchQuery).sort({ month: 1, year: 1 })])
        res1 = response1
        res2 = response2
      }
      else
        res2 = await TradeHistory.find(searchQuery)
    }
    const res = { currentMonth: res1, resetAllMonth: res2 }
    return { data: res, err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const TradeService = { getTradeAnalysis }

module.exports = TradeService