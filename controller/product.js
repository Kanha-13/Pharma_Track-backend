const products = require('../models/product')
const patientsBill = require('../models/patientsBillInfo')
const salePurprof = require('../models/salePurchase')
const companyProduct = require('../models/partyCompanyList')
module.exports = {
    addProd: async (req, res) => {
        const data = req.body;
        await products.updateOne({ itemName: data.itemName, batch: data.batch, company: data.company, mrp: data.mrp, qnty: data.qnty }, { $inc: { stock: data.stock }, itemName: data.itemName, batchNo: data.batchNo, company: data.company, type: data.type, location: data.location, mrp: data.mrp, rate: data.rate, gst: data.gst, netRate: data.netRate, mnfDate: data.mnfDate, expDate: data.expDate, hsn_sac: data.hsn_sac, category: data.category, $push: { seller: data.seller, purDate: data.purDate, billNo: data.billNo } }, { new: true, upsert: true });

        const entred = await companyProduct.find({ companyName: (data.company).toUpperCase() })
        if (entred.length == 0) {
            await companyProduct.updateOne({ companyName: (data.company).toUpperCase() }, { companyName: (data.company).toUpperCase(), $push: { products: (data.itemName).toUpperCase(), wholeSellers: data.seller } }, { new: true, upsert: true })
            res.status(201).json({ message: "Product Added" })
            return
        }
        const prod = await companyProduct.find({ companyName: (data.company).toUpperCase(), products: (data.itemName).toUpperCase() })
        if (prod.length == 0) {
            const result = await companyProduct.updateOne({ companyName: (data.company).toUpperCase() }, { $push: { products: (data.itemName).toUpperCase() } })
        }
        const wholeselr = await companyProduct.find({ companyName: (data.company).toUpperCase(), wholeSellers: data.seller })
        if (wholeselr.length == 0) {
            const result = await companyProduct.updateOne({ companyName: (data.company).toUpperCase() }, { $push: { wholeSellers: data.seller } })
        }
        res.status(201).json({ message: "Product Added" })
    },
    deleteProd: async (req, res) => {
        for (var i = 0; i < req.body.length; i++)
            await products.deleteOne({ _id: req.body[i] })
        res.status(200).json("Product Deleted");
    },
    findProd: async (req, res) => {
        res.status(200).json(await products.find(req.bobdy));
    },

    getProfWithInitials: async (req, res) => {
        try {
            const resdata = await products.find({ itemName: { $regex: `^${req.query.key}`, $options: "i" } })
            res.status(200).json(resdata);
        } catch (error) {
            res.status(500).json({ message: "Something went wrong!" })
        }
    },

    //api for product which is near expiry
    nearExp: async (req, res) => {
        const data = await products.find({ expDate: { $lte: req.body.expDate, $gt: req.body.alertDate }, stock: { $gt: 0 } });
        const alertDate = await products.find({ expDate: { $lte: req.body.alertDate }, stock: { $gt: 0 } })
        const respo = [alertDate, data]
        res.status(200).json(respo);

    },
    getInvoiceNumber:async(req,res)=>{
        const count = await patientsBill.countDocuments();
        const data = { invoCount: count + 1 }
        res.status(200).json(data)
    },
    toCart: async (req, res) => {
        var Data = await products.find({ _id: req.body.ids })
        const count = await patientsBill.countDocuments();
        const data = { Data, invoCount: count + 1 }
        res.status(200).json(data)
    },
    // reduce stock after sale 
    reduceStock: async (req, res) => {
        var Medicines = [];
        const todaysdate = new Date()
        for (var i = 1; i < req.body[0].length; i++) {
            const result = await products.updateOne({ _id: req.body[0][i]._id }, { $inc: { stock: -(req.body[0][i].soldQnt) } })
            Medicines[i - 1] = req.body[0][i]
        }
        const billDetail = {
            date: new Date(Date.UTC(todaysdate.getFullYear(), todaysdate.getMonth(), todaysdate.getDate(), 0, 0, 0)),
            invoiceNo: req.body[0][0].invoiceNo,
            prescribedBy: req.body[0][0].prescribedBy,
            grandTtl: req.body[0][0].gttl,
            roundoff: req.body[0][0].roundoff,
            paid: req.body[0][0].paid,
            amtDue: req.body[0][0].amtDue,
            profitEarned: req.body[0][0].profit,
            medicines: Medicines,
        }
        var newBill = new patientsBill({
            patientName: req.body[0][0].patientName,
            mobileNo: req.body[0][0].mobileNo,
            // age: req.body[0][0].age,
            address: req.body[0][0].address,
            billDetail: billDetail,
        })
        await newBill.save()
        await salePurprof.updateOne({ date: new Date(Date.UTC(todaysdate.getFullYear(), todaysdate.getMonth(), todaysdate.getDate(), 0, 0, 0)) }, { $inc: { purchaseAmount: 0, sellAmount: req.body[0][0].gttl, profit: req.body[0][0].profit } }, { new: true, upsert: true })
        res.status(201).send("New bill Generated and stock updated")
    },
    goingOutOfStock: async (req, res) => {
        var alertProd = await products.find({ category: "tablet", stock: { $lte: 30 } })
        alertProd.push(await products.find({ category: "bottle", stock: { $lte: 5 } }))
        res.status(200).json(alertProd)
    }
}

