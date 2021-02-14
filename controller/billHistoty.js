const  products = require('../models/product')
const patientsBill = require('../models/patientsBillInfo')
const ObjectId = require('mongodb').ObjectID
module.exports ={
    getBillHistory:async(req,res)=>{
        const BillHistory= await patientsBill.find({mobileNo:req.body.mobileNo})
        res.status(200).json(BillHistory)
    },
    renderBill:async(req,res)=>{
        const billId = new ObjectId(req.body.billId);
        const data = await patientsBill.aggregate([
            {
                $match:{_id:billId}
            },
            {
                $lookup:{
                    from:"products",
                    localField:"billDetail.medicines._id",
                    foreignField:"_id",
                    as:"purchasedMedDetail"
                }
            },
            {
                $project:{
                    // medicines:"$purchasedMedicines",
                    _id:0

                }
            }
        ])
        res.status(200).json(data)
    }
}

