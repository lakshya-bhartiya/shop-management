
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