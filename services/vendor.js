const Vendor = require("../models/vendor")

const checkDuplicate = async (data) => {
  return new Promise((resolve, reject) => {
    Vendor.findOne({ vendorName: data.vendorName }).then((res) => {
      if (res)
        return resolve(res._id)
      else
        return resolve(false)
    })
  })
}

const addVendor = async (data) => {
  try {
    const id = await checkDuplicate(data);
    if (id) {//if true means entry already exist therefore just update the stock, not create new enty
      return { data: null, err: "Duplicate Entry" }
    } else {
      const res = await Vendor.create(data);
      return { data: res, err: null }
    }
  } catch (error) {
    return { data: null, err: error }
  }
}

const updateVendor = async (id, data) => {
  try {
    const res = await Vendor.updateOne({ _id: id }, data);
    return { data: res, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const getVendor = async (vId) => {
  try {
    const res = await Vendor.findById(vId);
    return { data: res, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const getVendors = async () => {
  try {
    const res = await Vendor.find({});
    return { data: res, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const getVendorsQuery = async (query) => {
  try {
    const res = await Vendor.find({ vendorName: { $regex: `^${query.key}`, $options: "i" } }).sort("1").limit(20)
    return { data: res, err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const deleteVendor = async (vId) => {
  try {
    const res = await Vendor.deleteOne({ _id: vId });
    return { data: res, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}


const VendorService = { addVendor, updateVendor, getVendor, getVendors, getVendorsQuery, deleteVendor }


module.exports = VendorService