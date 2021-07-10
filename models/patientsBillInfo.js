const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
    patientName: {
        type: String,
        require: true,
    },
    mobileNo: {
        type: String,
        require: true,
    },
    // age: {
    //     type: String,
    //     require: true,
    // },
    address: {
        type: String,
        require: true,
    },
    billDetail: {
        amtDue: String,
        roundoff: String,
        date: Date,
        grandTtl: String,
        invoiceNo: String,
        prescribedBy: String,
        paid: String,
        profitEarned: String,
        medicines: [{

            _id: {
                type: mongoose.Schema.Types.ObjectId,
                $ref: 'products'
            },
            Soldqnt: String,
            disc: String,
            total: String
        }
        ]


    },
})

module.exports = mongoose.model('bill', BillSchema);
