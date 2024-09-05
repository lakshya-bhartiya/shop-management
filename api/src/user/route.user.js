const express = require("express");
const userController = require("./controller.user");
const validate = require("../../middleware/middleware.validation");
const { registerValidationSchema, loginValidationSchema } = require("../../validations/validation.user");

const router = express.Router()
router.post("/register",validate(registerValidationSchema), userController.registerUser)
router.post("/login",validate(loginValidationSchema), userController.loginUser)

module.exports = router