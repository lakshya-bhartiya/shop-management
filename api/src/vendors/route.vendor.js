const express = require("express");
const vendorController = require("./controller.vendor");
const validate = require("../../middleware/middleware.validation")
const authanticationToken = require("../../middleware/authHelper");
const vendorValidationSchema = require("../../validations/validation.vendor");
const router = express.Router();

// Create a new vendor
router.post("/createVendor", validate(vendorValidationSchema), authanticationToken, vendorController.createVendor);

// Get all vendors
router.get("/getAllVendors", authanticationToken, vendorController.getVendors);

// Get a single vendor by ID
router.get("/getSingleVendor/:id", authanticationToken, vendorController.getSingleVendor);

// Edit vendor details
router.patch("/editVendor/:id",validate(vendorValidationSchema), authanticationToken, vendorController.editVendor);

// Soft delete a vendor by ID
router.delete("/deleteVendor/:id", authanticationToken, vendorController.deleteVendor);

// Get total vendor count
router.get("/countVendors", authanticationToken, vendorController.getVendorCount);

module.exports = router;
