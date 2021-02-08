const  products = require('../models/product')
const patientsBill = require('../models/patientsBillInfo')
module.exports ={
    addProd: async (req,res)=>{
        const data = req.body;
        
        await products.updateOne({itemName:data.itemName,batch:data.batch,company:data.company,mrp:data.mrp,qnty: data.qnty}, {$inc: {stock:data.stock},itemName:data.itemName,batchNo:data.batchNo,company:data.company,type:data.type,location:data.location,mrp:data.mrp,rate:data.rate,gst:data.gst,netRate:data.netRate, mnfDate:data.mnfDate,expDate:data.expDate,$push: { seller: data.seller ,purDate:data.purDate,billNo:data.billNo} }, {new:true,upsert: true});
        res.status(201).json({message:"Product Added"})
        
    },
    deleteProd: async (req,res)=>{
        const delProd = req.body;
        console.log(delProd)
        await products.deleteOne(delProd)
        res.status(200).json({ message: "Product Deleted" });
    },  
    sellProd: async (req,res)=>{
        const sellProd = req.body.itemName;
        await products.findByIdAndUpdate()
    },
    findProd: async (req,res)=>{
        const data = await products.find(req.bobdy)
        res.status(200).json(data);
    },

    //api for product which is near expiry
    nearExp: async (req,res)=>{
        const data = await products.find({expDate:{$lte: req.body.expDate,$gt: req.body.alertDate}});
        const alertDate = await products.find({expDate:{$lte: req.body.alertDate}})
        const respo = [alertDate,data]
        res.status(200).json(respo);
        
    },
    toCart:async(req,res)=>{
        var Data = await products.find({_id:req.body.ids})
        const count= await patientsBill.countDocuments();
        const data = {Data,invoCount:count+1}
        res.status(200).json(data)
    },
    reduceStock:async(req,res)=>{
        var Medicines=[];
        for(var i=1;i<req.body.length;i++)
        {    
            await products.updateOne({_id:req.body[i].pId},{$inc:{stock:-(req.body[i].Soldqnt)}})
            Medicines[i-1]=req.body[i]
        }
        const billDetail = {
            date:new Date(),
            invoiceNo:req.body[0].invoiceNo,
            prescribedBy:req.body[0].prescribedBy,
            grandTtl:req.body[0].gttl,
            paid:req.body[0].paid,
            amtDue:req.body[0].amtDue,
            medicines:Medicines,
        }
        var newBill = new patientsBill({
            patientName:req.body[0].patientName,
            mobileNo:req.body[0].mobileNo,
            age:req.body[0].age,
            address:req.body[0].address,
            billDetail:billDetail,
        })
        await newBill.save()
        res.status(201).send("New bill Generated and stock updated")
        
    }
}

