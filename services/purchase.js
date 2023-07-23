const Purchase = require("../models/purchase")
const mongoose = require('mongoose');


const checkDuplicate = async (data) => {
  return new Promise((resolve, reject) => {
    Purchase.findOne({ billNo: data.billNo, vId: data.vId }).then((res) => {
      if (res)
        return resolve(res._id)
      else
        return resolve(false)
    })
  })
}

const addPurchase = async (data) => {
  try {
    const id = await checkDuplicate(data.billInfo);
    if (id) {//if true means entry already exist therefore just update the purchase, not create new enty
      return { data: null, err: "Duplicate entry!" }
    } else {
      const Data = {
        ...data.billInfo,
        productsDetail: data.productsDetail
      }
      const res = await Purchase.create(Data);
      return { data: res, err: null }
    }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const updatePurchase = async (id, data) => {
  try {
    const response = await Purchase.updateOne({ _id: id }, data)
    return { data: response, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const updatePurchases = async (ids, data) => {
  try {
    const response = await Purchase.updateMany({ _id: { $in: ids } }, data)
    return { data: response, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const getPurchaseById = async (id) => {
  try {
    const res = await Purchase.findById(id)
    // const res = await Purchase.aggregate([
    //   {
    //     $match: { _id: mongoose.Types.ObjectId(id) }

    //   },
    //   {
    //     $lookup: {
    //       from: "products",
    //       localField: "productsDetail.pId",
    //       foreignField: "_id",
    //       as: "productNames"
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'vendors',
    //       localField: 'vId',
    //       foreignField: '_id',
    //       as: 'vendorDetail'
    //     }
    //   },
    //   {
    //     $project: {
    //       "_id": 1,
    //       "productsDetail": 1,
    //       "purDate": 1,
    //       "vId": 1,
    //       "billNo": 1,
    //       "paymentType": 1,
    //       "totalAmt": 1,
    //       "totalValue": 1,
    //       "totalTax": 1,
    //       "productNames.itemName": 1,
    //       "vendorDetail.vendorName": 1
    //     }
    //   },
    // ]);
    return { data: res, err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const getPurchases = async (query) => {
  try {
    let searchQuery = {}
    if (query.vId)
      searchQuery.vId = query.vId
    if (query.billNo)
      searchQuery.billNo = query.billNo
    if (query.ids)
      if (query.ids.length)
        searchQuery._id = { $in: query.ids }
    if (query.from && query.to) {
      searchQuery.purDate = {
        $lte: query.to, $gte: query.from
      }
    }
    if (query.paymentType)
      searchQuery.paymentType = query.paymentType
    const res = await Purchase.find(searchQuery);
    return { data: res, err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const deletePurchase = async (id) => {
  try {
    const response = await Purchase.deleteOne({ _id: id })
    return { data: response, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const deletePurchases = async (ids) => {
  try {
    const response = await Purchase.deleteMany({ _id: { $in: ids } })
    return { data: response, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

// const billPayment =async

const PurchaseService = { addPurchase, updatePurchase, updatePurchases, getPurchases, deletePurchase, getPurchaseById, deletePurchases }


module.exports = PurchaseService