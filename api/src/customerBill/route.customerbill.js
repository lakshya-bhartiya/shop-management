const express = require("express");
const billController = require("./controller.customerbill"); // Import the bill controller
const authenticationToken = require("../../middleware/authHelper"); // Import your auth middleware if needed
// const validate = require("../../middleware/middleware.validation"); // Middleware for validation if necessary
// const billValidationSchema = require("../../validations/validation.bill"); // Bill validation schema (if required)

const router = express.Router();

// CRUD Operations for Customer Bills

// Create a new bill for a customer
router.post(
  "/createBill",
  authenticationToken, // Add authentication middleware
  billController.createBill
);

// Get a single bill by ID for a customer
router.get(
  "/getSingleBill/:billId",
  authenticationToken, // Add authentication middleware
  billController.getSingleBill
);

// Get all bills for a customer
router.get(
  "/getAllBills",
  authenticationToken, // Add authentication middleware
  billController.getAllBills
);

// Update a bill by ID for a customer
router.patch(
  "/editBill/:id",
  authenticationToken, // Add authentication middleware
  billController.updateBill
);

// Delete a bill by ID (soft delete)
router.delete(
  "/deleteBill/:billId",
  authenticationToken, // Add authentication middleware
  billController.deleteBill
);

// Add this route in your router file
router.get(
    "/totalReceived/:period", // e.g., /totalReceived/day
    authenticationToken, // Add authentication middleware if needed
    billController.getTotalReceivedAmount
  );

  // Add this route in your router file
router.get(
    "/totalBillCount/:period", // e.g., /totalBillCount/day
    authenticationToken, // Add authentication middleware if needed
    billController.getTotalBillCount
  );

  // Add this route in your router file
router.get(
    "/totalBillsForCustomer/:customerId", // e.g., /totalBillsForCustomer/1234567890abcdef12345678
    authenticationToken, // Add authentication middleware if needed
    billController.getTotalBillsForCustomer
  );

  // Add these routes in your router file

// Get total received amount for a particular customer
router.get(
    "/totalReceivedForCustomer/:customerId", // e.g., /totalReceivedForCustomer/1234567890abcdef12345678
    authenticationToken, // Add authentication middleware if needed
    billController.getTotalReceivedAmountForCustomer
  );
  
  // Get total due amount for a particular customer
  router.get(
    "/totalDueForCustomer/:customerId", // e.g., /totalDueForCustomer/1234567890abcdef12345678
    authenticationToken, // Add authentication middleware if needed
    billController.getTotalDueAmountForCustomer
  );

  router.get(
    "/invoices/:customerId", // e.g., /invoices/1234567890abcdef12345678
    authenticationToken, // Add authentication middleware if needed
    billController.getInvoicesForCustomer
  );
module.exports = router;