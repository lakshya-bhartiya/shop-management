const express = require("express");
const customerController = require("./controller.customer");
const authanticationToken = require("../../middleware/authHelper")
const validate = require("../../middleware/middleware.validation");
const customerValidationSchema = require("../../validations/validation.customer");
const router = express.Router();

router.post("/createCustomer", validate(customerValidationSchema),authanticationToken, customerController.createCustomer);
router.get("/getAllCustomer",authanticationToken, customerController.getCustomers)
router.delete("/deleteCustomer/:id", authanticationToken, customerController.deleteCustomer)
router.patch("/editCustomer/:id", authanticationToken, customerController.editCustomer)
// router.get("/getCustomerBill/:id",authanticationToken, customerController.getCustomerBill)
router.get("/getSingleCustomer/:id", authanticationToken, customerController.getSingleCustomer)
router.get("/countCustomers", authanticationToken, customerController.getCustomerCount);
module.exports = router;