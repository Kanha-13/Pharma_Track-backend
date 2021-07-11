const partyPurchase = require('../models/partyPurchase')
const partyProfile = require('../models/partyProfile')
const salePurprof = require('../models/salePurchase')
const companyList = require('../models/partyCompanyList')

module.exports = {
    addNewParty: async (req, res) => {
        const date = new Date()
        const newParty = new partyProfile({
            partyName: req.body.partyName.toUpperCase(),
            address: req.body.address.toUpperCase(),
            mobileNo: req.body.mobileNo,
        })
        await newParty.save()
        res.status(201).send("Party Added")
    },
    getPartyList: async (req, res) => {
        res.status(200).send(await partyProfile.find({}))
    },
    purchaseEntry: async (req, res) => {
        const data = req.body
        const purchaseDate = new Date(req.body.purDate);
        await partyPurchase.updateOne({ partyName: data.partyName, date: new Date(Date.UTC(purchaseDate.getFullYear(), purchaseDate.getMonth(), purchaseDate.getDate(), 0, 0, 0)) }, { $inc: { totalPurchaseOf: data.totalPurchaseOf }, $push: { billNo: data.billNo }, date: new Date(Date.UTC(purchaseDate.getFullYear(), purchaseDate.getMonth(), purchaseDate.getDate(), 0, 0, 0)) }, { new: true, upsert: true })
        await salePurprof.updateOne({ date: new Date(Date.UTC(purchaseDate.getFullYear(), purchaseDate.getMonth(), purchaseDate.getDate(), 0, 0, 0)) }, { $inc: { purchaseAmount: data.totalPurchaseOf, sellAmount: 0, profit: 0 } }, { new: true, upsert: true })
        if (data.payMode === "credit") {
            await partyProfile.updateOne({ partyName: data.partyName }, { $inc: { balance: data.totalPurchaseOf } })
        }
        res.status(201).send("Entry Updated")
    },

    updateCompanyList: async (req, res) => {
        await companyList.updateOne({ companyName: (req.body.companyName).toUpperCase() }, { $push: { wholeSellers: req.body.wholeSellers } }, { new: true, upsert: true })
        res.status(201).send("Company List Updated")
    },
    getcompanyPartyList: async (req, res) => {
        res.status(200).json(await companyList.find({}))
    },
    getCreditBalance: async (req, res) => {
        const party = await partyProfile.findOne({ partyName: req.body.partyName })
        res.status(200).json({ balance: party.balance })
    },
    payCreditBalance: async (req, res) => {
        await partyProfile.updateOne({ partyName: req.body.partyName }, { $inc: { balance: -(req.body.amount) } })
        res.status(201).send("Balance updated")
    }


}

