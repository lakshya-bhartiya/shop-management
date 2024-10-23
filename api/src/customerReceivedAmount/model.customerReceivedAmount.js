const mongoose = require("mongoose");

const receivedInvoiceSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  receivedAmount: {
    type: Number,
    required: true,
  },
  invoiceDate:{
    type: Date,
    required: true
  },
  dueAmount: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model("ReceivedInvoice", receivedInvoiceSchema);