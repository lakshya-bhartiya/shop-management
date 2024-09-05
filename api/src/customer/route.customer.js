const express = require("express");
const customerController = require("./controller.customer");

const router = express.Router();

router.post("/createCustomer", customerController.createCustomer);

module.exports = router;