const express = require("express");

const router = express.Router()

const validate = require("../../middleware/middleware.validation")
const billValidationSchema = require("../../validations/validation.customerBill")

const billController = require("./controller.customerbill")

router.post("/createBill",validate(billValidationSchema), billController.createBill)
router.get("/getBills", billController.getBills)
router.delete("/deleteBills/:id", billController.deleteCustomerBills)

module.exports = router