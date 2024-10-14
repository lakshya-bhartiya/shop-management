const Joi = require("joi");

// Vendor validation schema
const vendorValidationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    address: Joi.string().min(5).required(),
    mobile: Joi.string()
        .pattern(/^[6-9]\d{9}$/) // Ensures mobile starts with 6, 7, 8, or 9 and is 10 digits long
        .required()
        .messages({
            "string.pattern.base": "Mobile number must start with 6, 7, 8, or 9 and be 10 digits long",
        }),
})


module.exports = vendorValidationSchema