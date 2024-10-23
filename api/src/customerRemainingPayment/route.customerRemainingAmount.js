// routes/paymentRoutes.js
const express = require("express");
const paymentController = require("./controller.customerRemainingAmount");
const authenticationToken = require("../../middleware/authHelper");

const router = express.Router();

// Process a payment with bill ID in the URL
router.post("/pay/:billId", authenticationToken, paymentController.makePayment);

// Get total transactions for a given period
// router.get("/totalTransactions/:period", authenticationToken, paymentController.getTotalTransactions);

module.exports = router;