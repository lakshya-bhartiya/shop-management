const express = require("express");
const userInvoicesController = require("./controller.invoiceTransaction");
const authenticationToken = require("../../middleware/authHelper"); // Import your auth middleware if needed

const router = express.Router();

// Get all invoices created by a specific user
router.get(
  "/invoices", // e.g., /invoices/1234567890abcdef12345678
  authenticationToken, // Add authentication middleware if needed
  userInvoicesController.getInvoicesByUser
);

module.exports = router;