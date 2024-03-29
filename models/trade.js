const mongoose = require('mongoose');
const tradeSchema = new mongoose.Schema({
    salesCount: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    revenue: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    purchaseCount: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    investment: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    profit: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    salesCredit: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    purchaseCredit: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    date: {
        type: Date,
        required: true
    },
    categoryWiseSale: {
        allopathic: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
        ayurvedic: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
        general: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
        generic: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
        surgical: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
    },
    categoryWisePurchase: {
        allopathic: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
        ayurvedic: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
        general: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
        generic: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
        surgical: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
    },
    totalLoss: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    creditCollection: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    creditPaidOff: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    }
})

module.exports = mongoose.model('trade', tradeSchema); //daily trade
