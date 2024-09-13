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
    customerName:{
        type: String, 
        required: true
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
    discount: {
        type: Number,
        required: true,
        default: 0, // Default discount is 0
    },
    discountedAmount: {
        type: Number,
        required: true,
        default: 0, // Default discounted amount is 0
    },
    onlineAmount: {
        type: Number,
        required: true,
    },
    cashAmount: {
        type: Number,
        required: true,
    },
    dueAmount: {
        type: Number,
        required: true,
    },
    invoiceDate: { // New field for invoice date
        type: Date,
        required: true,
        default: Date.now, // Default to current date
    },
    dueDate: { // New field for due date
        type: Date,
        required: true,
    },
    status: { // New field for payment status
        type: String,
        enum: ['paid', 'unpaid'], // Options for the payment status
        default: 'unpaid', // Default value
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model who created the bill
        required: true // Ensure userId is required
    }
});


module.exports = mongoose.model("Bill", billSchema)