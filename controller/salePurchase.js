const salePuruprof = require('../models/salePurchase')
const partyPurchaseHistory = require('../models/partyPurchase')
module.exports = {
    sellPurReport: async (req, res) => {
        res.status(200).json(await salePuruprof.find({ date: { $gte: new Date(req.body.from), $lte: new Date(req.body.to) } }))
    },
    partyPuchaseHistory: async (req, res) => {
        res.status(200).json(await partyPurchaseHistory.find({ partyName: req.body.partyName, date: { $gte: new Date(req.body.from), $lte: new Date(req.body.to) } }))
    }
}

