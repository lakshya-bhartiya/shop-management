const mongoose = require("mongoose");

const invoiceTransactionSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
  },
  invoiceDate: {
    type: Date,
    default: Date.now,
  },
  receivedAmount: {
    type: Number,
    required: true,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
  customerId: { // New field for customer reference
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer", // Reference to the Customer model
    required: true, // Make it required if applicable
}
}, { timestamps: true });

module.exports = mongoose.model("InvoiceTransaction", invoiceTransactionSchema);
