const Joi = require("joi");

const registerValidationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.base": "Name should be a string.",
            "string.empty": "Name is required.",
            "string.min": "Name should have at least 3 characters.",
            "string.max": "Name should have at most 50 characters.",
            "any.required": "Name is required."
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Invalid email format.",
            "any.required": "Email is required."
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.base": "Password should be a string.",
            "string.empty": "Password is required.",
            "string.min": "Password should have at least 6 characters.",
            "any.required": "Password is required."
        }),
        confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            "any.only": "Confirm password must match the password.",
            "any.required": "Confirm password is required."
        }),
    mobile: Joi.string()
        .pattern(/^[0-9]+$/)
        .length(10)
        .required()
        .messages({
            "string.base": "Mobile should be a string of digits.",
            "string.empty": "Mobile number is required.",
            "string.pattern.base": "Mobile number should contain only digits.",
            "string.length": "Mobile number should be exactly 10 digits.",
            "any.required": "Mobile number is required."
        })
});


const loginValidationSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Invalid email format.",
            "any.required": "Email is required."
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.base": "Password should be a string.",
            "string.empty": "Password is required.",
            "string.min": "Password should have at least 6 characters.",
            "any.required": "Password is required."
        }),
})
module.exports = {registerValidationSchema, loginValidationSchema};
