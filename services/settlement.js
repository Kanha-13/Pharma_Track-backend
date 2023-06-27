const Settlement = require("../models/settlement")

const checkDuplicate = async (data) => {
  return new Promise((resolve, reject) => {
    Settlement.findOne({ sId: data.sId }).then((res) => {
      if (res)
        return resolve(res._id)
      else
        return resolve(false)
    })
  })
}

const addSettlement = async (data) => {
  try {
    const id = await checkDuplicate(data);
    if (id) {
      return { data: null, err: "Settlement already created" }
    } else {
      const res = await Settlement.create(data);
      return { data: res, err: null }
    }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const getSettlements = async () => {
  try {
    const res = await Settlement.aggregate([
      { $match: { } },
      {
        $lookup: {
          from: 'products',
          localField: 'pId',
          foreignField: '_id',
          as: 'productDetail'
        }
      },
      {
        $lookup: {
          from: 'vendors',
          localField: 'vId',
          foreignField: '_id',
          as: 'vendorDetail'
        }
      },
      {
        $lookup: {
          from: 'stocks',
          localField: 'sId',
          foreignField: '_id',
          as: 'stockDetail'
        }
      }
    ]);
    return { data: res, err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const updateSettlement = async (settlementId, data) => {
  try {
    const res = await Settlement.updateOne({ _id: settlementId }, data);
    return { data: res, err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const deleteSettlement = async (settlementId) => {
  try {
    const res = await Settlement.deleteOne({ _id: settlementId });
    return { data: res, err: null }
  } catch (error) {
    console.log(error)
    return { data: null, err: error }
  }
}

const SettlementService = { addSettlement, getSettlements, updateSettlement, deleteSettlement }


module.exports = SettlementService