const mongoose = require("mongoose");

const invoiceDetailSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
  },
  receivedAmount: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("InvoiceDetail", invoiceDetailSchema);