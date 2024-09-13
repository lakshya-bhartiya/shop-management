const express = require("express");

const router = express.Router()
const authanticationToken = require("../../middleware/authHelper")
const validate = require("../../middleware/middleware.validation")
const billValidationSchema = require("../../validations/validation.customerBill")

const billController = require("./controller.customerbill")

router.post("/createBill",validate(billValidationSchema),authanticationToken, billController.createBill)
router.get("/getBills",authanticationToken, billController.getBills)
router.delete("/deleteBills/:id",authanticationToken, billController.deleteCustomerBills)
router.get("/getCustomerBill/:invoiceNumber", authanticationToken, billController.getBillByInvoice)
router.patch("/editBill/:invoiceNumber",validate(billValidationSchema), authanticationToken, billController.editBill)

module.exports = router