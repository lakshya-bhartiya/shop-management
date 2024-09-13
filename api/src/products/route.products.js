const express = require("express");
const productController = require("./controller.product");
const authanticationToken = require("../../middleware/authHelper")
const validate = require("../../middleware/middleware.validation")
const productValidationSchema = require("../../validations/validation.product")

const router = express.Router();

// Route to create a new product
router.post("/addProducts",validate(productValidationSchema), authanticationToken, productController.createProduct);

// Route to get all products
router.get("/getProducts",authanticationToken, productController.getProducts);

router.patch("/editProduct/:id",validate(productValidationSchema), authanticationToken, productController.editProduct)

module.exports = router;