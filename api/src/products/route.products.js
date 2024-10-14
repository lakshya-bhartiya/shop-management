// routes.product.js
const express = require("express");
const productController = require("./controller.product");
const authenticationToken = require("../../middleware/authHelper");
const validate = require("../../middleware/middleware.validation");
const productValidationSchema = require("../../validations/validation.product");

const router = express.Router();

// Route to create a new product with category association
router.post("/addProducts", validate(productValidationSchema), authenticationToken, productController.createProduct);

// Route to get all products
router.get("/getProducts", authenticationToken, productController.getProducts);

// Route to edit a product
router.patch("/editProduct/:id", validate(productValidationSchema), authenticationToken, productController.editProduct);

router.delete("/deleteProduct/:id", authenticationToken, productController.deleteProduct)

router.get("/getSingleProduct/:id", authenticationToken, productController.getSingleProduct)

module.exports = router;
