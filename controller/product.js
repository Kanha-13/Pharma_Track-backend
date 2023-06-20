const products = require('../models/product')
const patientsBill = require('../models/patientsBillInfo')
const salePurprof = require('../models/salePurchase')
const companyProduct = require('../models/partyCompanyList')
const ProductService = require('../services/product')
const SUCCESS = require('../constants/successMessage')

const addProd = async (req, res) => {
    const data = req.body;
    const response = await ProductService.addProduct(data)
    if (response.err)
        res.status(500).json({ data: null, error: response.err })
    else
        res.status(201).json({ data: SUCCESS.PRODUCT.ADD_SUCCESS, error: response.err })
}

const deleteProd = async (req, res) => {
    for (var i = 0; i < req.body.length; i++)
        await products.deleteOne({ _id: req.body[i] })
    res.status(200).json("Product Deleted");
}

const findProd = async (req, res) => {
    const pId = req.query.item
    try {
        if (pId) return res.status(200).json(await products.findById(pId));
        else return res.status(400).json({ message: "product id missing" });
    } catch (error) {
        res.status(500).json({ message: "Server error!" });
    }
}

const getProdWithInitials = async (req, res) => {
    try {
        const resdata = await products.find({ itemName: { $regex: `^${req.query.key}`, $options: "i" } })
        res.status(200).json(resdata);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" })
    }
}

const udpateProduct = async (req, res) => {
    const pId = req.query.item
    if (!pId) return res.status(400).json({ message: "product id missing" });
    const data = req.body
    const response = await ProductService.updateProduct(pId, data)
    if (response.err)
        res.status(500).json({ data: null, error: response.err })
    else
        res.status(200).json({ data: SUCCESS.PRODUCT.UPDATE_SUCCESS, error: null })
}

const nearExpiry = async (req, res) => {
    const data = await products.find({ expDate: { $lte: req.body.expDate, $gt: req.body.alertDate }, stock: { $gt: 0 } });
    const alertDate = await products.find({ expDate: { $lte: req.body.alertDate }, stock: { $gt: 0 } })
    const respo = [alertDate, data]
    res.status(200).json(respo);

}
const getInvoiceNumber = async (req, res) => {
    const count = await patientsBill.countDocuments();
    const data = { invoCount: count + 1 }
    res.status(200).json(data)
}
const toCart = async (req, res) => {
    var Data = await products.find({ _id: req.body.ids })
    const count = await patientsBill.countDocuments();
    const data = { Data, invoCount: count + 1 }
    res.status(200).json(data)
}
// reduce stock after sale 
const reduceStock = async (req, res) => {
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
}
const goingOutOfStock = async (req, res) => {
    var alertProd = await products.find({ category: "tablet", stock: { $lte: 30 } })
    alertProd.push(await products.find({ category: "bottle", stock: { $lte: 5 } }))
    res.status(200).json(alertProd)
}

const ProductController = {
    addProdHandler: addProd,
    deleteProdHandler: deleteProd,
    findProdHandler: findProd,
    udpateProductHandler: udpateProduct,
    getProdWithInitialsHandler: getProdWithInitials,
    nearExpiryHandler: nearExpiry,
    getInvoiceNumberHandler: getInvoiceNumber,
    toCartHandler: toCart,
    reduceStockHandler: reduceStock,
    goingOutOfStockHandler: goingOutOfStock

}
module.exports = ProductController

