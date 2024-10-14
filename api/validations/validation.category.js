const Joi = require("joi");

// Define the validation schema for Category
const categoryValidationSchema = Joi.object({
    categoryName: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.base': `"categoryName" should be a type of 'text'`,
            'string.empty': `"categoryName" cannot be an empty field`,
            'string.min': `"categoryName" should have a minimum length of {#limit}`,
            'string.max': `"categoryName" should have a maximum length of {#limit}`,
            'any.required': `"categoryName" is a required field`
        })
});

module.exports = categoryValidationSchema;
