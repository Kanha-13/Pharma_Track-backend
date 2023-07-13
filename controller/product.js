const products = require('../models/product')
const ProductService = require('../services/product')
const SUCCESS = require('../constants/successMessage')

const addProdHandler = async (req, res) => {
    const data = req.body;
    const response = await ProductService.addProduct(data)
    if (response.err)
        res.status(500).json({ data: null, error: response.err })
    else
        res.status(201).json({ data: SUCCESS.PRODUCT.ADD_SUCCESS, error: response.err })
}

const deleteProdHandler = async (req, res) => {
    const pId = req.query.item
    if (!pId) return res.status(400).json({ message: "product id missing" });
    const response = await ProductService.deleteProd(pId)
    if (response.err)
        res.status(500).json({ data: null, error: response.err })
    else
        res.status(200).json({ data: SUCCESS.PRODUCT.DELETE_SUCCESS, error: null })
}

const findProdHandler = async (req, res) => {
    const pId = req.query.item
    try {
        if (pId) return res.status(200).json(await products.findById(pId));
        else return res.status(400).json({ message: "product id missing" });
    } catch (error) {
        res.status(500).json({ message: "Server error!" });
    }
}

const getAllProductsHandler = async (req, res) => {
    const response = await ProductService.getAllProduct()
    if (response.err)
        res.status(500).json({ data: null, error: response.err })
    else
        res.status(200).json({ data: response.data, error: response.err });
}

const getProdWithInitialsHandler = async (req, res) => {
    try {
        const resdata = await products.find({ itemName: { $regex: `^${req.query.key}`, $options: "i" } })
        res.status(200).json(resdata);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" })
    }
}

const udpateProductHandler = async (req, res) => {
    const pId = req.query.item
    if (!pId) return res.status(400).json({ message: "product id missing" });
    const data = req.body
    const response = await ProductService.updateProduct(pId, data)
    if (response.err)
        res.status(500).json({ data: null, error: response.err })
    else
        res.status(200).json({ data: SUCCESS.PRODUCT.UPDATE_SUCCESS, error: null })
}

const ProductController = {
    addProdHandler,
    deleteProdHandler,
    findProdHandler,
    udpateProductHandler,
    getProdWithInitialsHandler,
    getAllProductsHandler
}
module.exports = ProductController

