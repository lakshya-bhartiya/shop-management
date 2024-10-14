const express = require("express");
const receivedInvoiceController = require("./controller.customerReceivedAmount");
const authenticationToken = require("../../middleware/authHelper"); // Import your auth middleware if needed

const router = express.Router();

// Get total received amount for a particular customer
router.get(
  "/receivedInvoices/:customerId", // e.g., /receivedInvoices/1234567890abcdef12345678
  authenticationToken, // Add authentication middleware if needed
  receivedInvoiceController.getReceivedInvoicesForCustomer
);

module.exports = router;