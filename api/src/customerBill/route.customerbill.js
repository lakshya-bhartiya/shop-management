const express = require("express");
const billController = require("./controller.customerbill"); // Import the bill controller
const authenticationToken = require("../../middleware/authHelper"); // Import your auth middleware if needed
const validate = require("../../middleware/middleware.validation")
const billValidationSchema = require("../../validations/validation.customerBill")

const router = express.Router();

// CRUD Operations for Customer Bills

// Create a new bill for a customer
router.post(
  "/createBill",
  validate(billValidationSchema), // Validate the request body against the schema
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
  validate(billValidationSchema), // Validate the request body against the schema
  authenticationToken, // Add authentication middleware
  billController.updateBill
);

// Delete a bill by ID (soft delete)
router.delete(
  "/deleteBill/:billId",
  authenticationToken, // Add authentication middleware
  billController.deleteBill
);

module.exports = router;