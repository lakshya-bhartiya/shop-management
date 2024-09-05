const { date } = require("joi");
const mongoose = require("mongoose")

const billSchema = mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    products: [{
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        }
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    amountReceived: {
        type: Number,
        required: true,
    },
    dueAmount: {
        type: Number,
        required: true,
    },
    status: { // New field for payment status
        type: String,
        enum: ['paid', 'unpaid'], // Options for the payment status
        default: 'unpaid', // Default value
    },
});


module.exports = mongoose.model("Bill", billSchema)