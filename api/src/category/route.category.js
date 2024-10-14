const express = require("express");

const router = express.Router()

const authanticationToken = require("../../middleware/authHelper")
const validate = require("../../middleware/middleware.validation")
const categoryValidationSchema = require("../../validations/validation.category")

const catergoryController = require('./controller.category')

router.post("/addCategory", validate(categoryValidationSchema), authanticationToken, catergoryController.createCategory)
router.get("/getAllCategory", authanticationToken, catergoryController.getAllCategory)
router.get('/getSingleCategory/:id', authanticationToken, catergoryController.getSingleCategory)
router.patch("/editCategory/:id", authanticationToken, catergoryController.editCategory)
router.delete("/deleteCategory/:id", authanticationToken, catergoryController.deleteCategory)
module.exports = router