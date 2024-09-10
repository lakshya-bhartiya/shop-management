const express = require("express");
const customerController = require("./controller.customer");
const authanticationToken = require("../../middleware/authHelper")
const router = express.Router();

router.post("/createCustomer",authanticationToken, customerController.createCustomer);
router.get("/getAllCustomer",authanticationToken, customerController.getCustomers)
router.delete("deleteCustomer/:id", authanticationToken, customerController.deleteCustomer)
// router.get("/getCustomerBill/:id",authanticationToken, customerController.getCustomerBill)

module.exports = router;