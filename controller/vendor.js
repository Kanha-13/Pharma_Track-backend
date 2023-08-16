const SUCCESS = require('../constants/successMessage');
const VendorService = require('../services/vendor')

const addVendorHandler = async (req, res) => {
    const data = req.body;
    const response = await VendorService.addVendor(data)
    if (response.err)
        res.status(500).json({ data: null, error: response.err })
    else
        res.status(201).json({ data: SUCCESS.VENDOR.ADD_SUCCESS, error: null })
}

const updateVendorHandler = async (req, res) => {
    const vId = req.query.vendor
    if (!vId) return res.status(400).json({ message: "vendor id missing" });
    const data = req.body
    const response = await VendorService.updateVendor(vId, data)
    if (response.err)
        res.status(500).json({ data: null, error: response.err })
    else
        res.status(200).json({ data: SUCCESS.VENDOR.UPDATE_SUCCESS, error: null })
}

const getVendorHandler = async (req, res) => {
    const vId = req.params.vId
    const response = await VendorService.getVendor(vId)
    if (response.err)
        res.status(500).json({ data: null, error: response.err })
    else
        res.status(200).json({ data: response.data, error: response.err })
}

const getVendorsHandler = async (req, res) => {
    const response = await VendorService.getVendors()
    if (response.err)
        res.status(500).json({ data: null, error: response.err })
    else
        res.status(200).json({ data: response.data, error: response.err })
}

const getVendorsQueryHandler = async (req, res) => {
    const query = req.query
    const response = await VendorService.getVendorsQuery(query)
    if (response.err)
        res.status(500).json({ data: null, error: response.err })
    else
        res.status(200).json({ data: response.data, error: response.err })
}

const deleteVendorHandler = async (req, res) => {
    const vId = req.params.vId
    const response = await VendorService.deleteVendor(vId)
    if (response.err)
        res.status(500).json({ data: null, error: response.err })
    else
        res.status(200).json({ data: SUCCESS.VENDOR.DELETE_SUCCESS, error: response.err })
}

const VendorController = { addVendorHandler, getVendorsHandler, getVendorsQueryHandler, getVendorHandler, updateVendorHandler, deleteVendorHandler }

module.exports = VendorController