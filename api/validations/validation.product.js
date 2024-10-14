const Joi = require("joi");

const productValidationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.base': `"name" should be a type of 'text'`,
            'string.empty': `"name" cannot be an empty field`,
            'string.min': `"name" should have a minimum length of {#limit}`,
            'any.required': `"name" is a required field`
        }),
    sellingPrice: Joi.number()
        .positive()
        .required()
        .messages({
            'number.base': `"sellingPrice" should be a number`,
            'number.positive': `"sellingPrice" must be a positive number`,
            'any.required': `"sellingPrice" is a required field`
        }),
    productCode: Joi.string()
        .required()
        .messages({
            'string.base': `"productCode" should be a type of 'text'`,
            'string.empty': `"productCode" cannot be an empty field`,
            'any.required': `"productCode" is a required field`
        }),
    categoryId: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
});

module.exports = productValidationSchema;