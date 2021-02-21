const products = require('../models/product')
const patientsBill = require('../models/patientsBillInfo')
const salePurprof = require('../models/salePurchase')
const ObjectId = require('mongodb').ObjectID
module.exports = {
    getBillHistory: async (req, res) => {
        res.status(200).json(await patientsBill.find({ mobileNo: req.body.mobileNo }))
    },
    renderBill: async (req, res) => {
        const billId = new ObjectId(req.body.billId);
        const data = await patientsBill.aggregate([
            {
                $match: { _id: billId }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "billDetail.medicines._id",
                    foreignField: "_id",
                    as: "purchasedMedDetail"
                }
            },
            {
                $project: {
                    // medicines:"$purchasedMedicines",
                    _id: 0

                }
            }
        ])
        res.status(200).json(data)
    },
    oldBillPrint: async (req, res) => {
        var Medicines = [];
        const reduceProfit = req.body[0][0].changeInProfit
        const reduceSell = req.body[0][0].changeInSell
        for (var i = 0; i < req.body[1].length; i++) {
            Medicines[i] = req.body[0][i + 1]
            await products.updateOne({ _id: req.body[1][i][0] }, { $inc: { stock: (req.body[1][i][1]) } })
        }
        const date = new Date(req.body[0][0].date)
        await salePurprof.updateOne({date:new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(), 0, 0, 0))}, { $inc: { profit: -reduceProfit, sellAmount: -reduceSell } })
        await patientsBill.updateOne({ 'billDetail.invoiceNo': req.body[0][0].invoiceNo }, { $set: { 'billDetail.grandTtl': req.body[0][0].gttl, 'billDetail.profitEarned': req.body[0][0].profit, 'billDetail.roundoff': req.body[0][0].roundoff, 'billDetail.paid': req.body[0][0].paid, 'billDetail.amtDue': req.body[0][0].amtDue, 'billDetail.medicines': Medicines, } })
        res.status(201).send("Done")
    }
}

