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

const getPurchaseById = async (id) => {
  try {
    const res = await Purchase.findById(id);
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
    if (query.from && query.to) {
      searchQuery.purDate = {
        $lte: query.to, $gte: query.from
      }
    }
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

const PurchaseService = { addPurchase, updatePurchase, getPurchases, deletePurchase, getPurchaseById }


module.exports = PurchaseService