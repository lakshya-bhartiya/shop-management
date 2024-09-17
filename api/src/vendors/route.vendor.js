const express = require("express");
const vendorController = require("./controller.vendor");
const authanticationToken = require("../../middleware/authHelper")
// const validate = require("../../middleware/middleware.validation")
// const productValidationSchema = require("../../validations/validation.product")

const router = express.Router();

// Route to create a new product
router.post("/addVendor", authanticationToken, vendorController.createvendor);

// Route to get all products
router.get("/getVendors",authanticationToken, vendorController.getvendors);

router.patch("/editVendor/:id", authanticationToken, vendorController.editvendor)

module.exports = router;