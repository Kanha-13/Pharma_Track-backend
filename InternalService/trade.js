const Trade = require("../models/trade")
const TradeHistory = require("../models/tradeHistory")

const updateOneSaleTrade = async (date, data) => {
  data = data.billInfo
  try {
    const saleCount = 1
    const revenue = data.grandTotal
    const profit = data.profit
    const salesCredit = data.amtDue

    const res = await Trade.updateOne({ date: date }, {
      $inc: {
        salesCount: saleCount, revenue: revenue, profit: profit, salesCredit: salesCredit
      },
      date: date
    }, { upsert: true })
    return { data: res, err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const updateOnePurchaseTrade = async (date, data) => {
  data = data.billInfo
  try {
    const purchaseCount = 1
    const investment = data.totalAmt
    const purchaseCredit = (data.paymentType === "CHALAN" || data.paymentType === "CREDIT") ? data.totalAmt : 0

    const res = await Trade.updateOne({ date: date }, {
      $inc: {
        purchaseCount: purchaseCount, investment: investment, purchaseCredit: purchaseCredit
      },
      date: date
    }, { upsert: true })
    return { data: res, err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const udpatePreviousMonthTrde = async () => {
  const today = new Date()
  const previousMonth = today.getMonth() //since this return month -1
  let searchYear = today.getFullYear();
  if (previousMonth === 0)//means january
    searchYear = today.getFullYear() - 1

  try {
    // //check is entry present
    // const isAuditDone = await TradeHistory.findOne({ month: previousMonth, year: searchYear })

    // //if yes return
    // if (isAuditDone?._id)
    //   return { data: null, err: "Entry already present" }

    let from = today.getFullYear() + "-" + (today.getMonth()) + "-" + "01" //previous month first date
    let to = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + "01" // till current month first date

    //search for previous records
    const daily_trade_record = await Trade.find({ date: { $lt: to, $gte: from } })

    //if no record return
    if (!daily_trade_record.length)
      return { data: null, err: "No record of previous month" }

    let salesCount = 0;
    let purchaseCount = 0;
    let investment = 0;
    let revenue = 0;
    let profit = 0;
    let salesCredit = 0;
    let purchaseCredit = 0;


    daily_trade_record.map((trade, index) => {
      salesCount += trade.salesCount
      purchaseCount += trade.purchaseCount
      investment += trade.investment
      revenue += trade.revenue
      profit += trade.profit
      salesCredit += trade.salesCredit
      purchaseCredit += trade.purchaseCredit
    })

    investment = investment.toFixed(2)
    revenue = revenue.toFixed(2)
    profit = profit.toFixed(2)
    salesCredit = salesCredit.toFixed(2)
    purchaseCredit = purchaseCredit.toFixed(2)


    await TradeHistory.updateOne({ month: previousMonth, year: searchYear }, {
      month: previousMonth, year: searchYear,
      $inc: {
        salesCount: salesCount, purchaseCount: purchaseCount,
        investment: investment, revenue: revenue, profit: profit,
        salesCredit: salesCredit, purchaseCredit: purchaseCredit
      }
    }, { upsert: true })

    const deleteResp = await deleteOldTrade(daily_trade_record)
    if (deleteResp.err)
      throw Error("Unable to delete old records")

    console.log("Entry made successfully and previous month daily trade record deleted")
    return { data: "Entry made successfully", err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const deleteOldTrade = async (records = []) => {
  try {
    let oldRecordIds = []
    records.map((record) => {
      oldRecordIds.push(record._id)
    })
    await Trade.deleteMany({ _id: { $in: oldRecordIds } })

    return { data: "Success", err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const TRADE = {
  updateOneSaleTrade,
  updateOnePurchaseTrade,
  udpatePreviousMonthTrde,
}

module.exports = TRADE;