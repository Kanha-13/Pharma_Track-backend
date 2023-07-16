const Vendor = require("../models/vendor")

const updateVendor = async (id, data) => {
  try {
    const res = await Vendor.updateOne({ _id: id }, data);
    return { data: res, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const VENDOR = {
  updateVendor
}

module.exports = VENDOR