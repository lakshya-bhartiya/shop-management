// // models/payment.js
// const mongoose = require("mongoose");

// const paymentSchema = new mongoose.Schema({
//     amount: {
//         type: Number,
//         required: true, // Amount is required
//     },
//     billId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Bill", // Reference to the Bill model
//         required: true, // Bill ID is required
//     },
//     customerId: { // Add this line
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Customer", // Reference to the Customer model
//         required: true, // Make it required if applicable
//     },
//     paymentDate: {
//         type: Date,
//         default: Date.now, // Default to the current date and time
//     },
// }, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// module.exports = mongoose.model("Payment", paymentSchema);

// models/customerRemainingAmount.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    billId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bill",
        required: true,
    },
    customerId: { // Add this field if it doesn't exist
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    paymentDate: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);