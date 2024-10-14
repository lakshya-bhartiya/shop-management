const Joi = require("joi");

const billValidationSchema = Joi.object({
    invoiceNumber: Joi.string()
        // .required()
        .messages({
            "string.base": "Invoice number should be a string.",
            "string.empty": "Invoice number is required.",
            "any.required": "Invoice number is required."
        }),
    customerId: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
    products: Joi.array().items(
        Joi.object({
            name: Joi.string()
                .required()
                .messages({
                    "string.base": "Product name should be a string.",
                    "any.required": "Product name is required."
                }),
            price: Joi.number()
                .required()
                .messages({
                    "number.base": "Price should be a number.",
                    "any.required": "Price is required."
                }),
            quantity: Joi.number()
                .required()
                .messages({
                    "number.base": "Quantity should be a number.",
                    "any.required": "Quantity is required."
                }),
            total: Joi.number()
                // .required()
                .messages({
                    "number.base": "Total should be a number.",
                    "any.required": "Total is required."
                })
        })
    ).required()
        .messages({
            "array.base": "Products should be an array.",
            "any.required": "Products are required."
        }),
    totalAmount: Joi.number()
        // .required()
        .messages({
            "number.base": "Total amount should be a number.",
            "any.required": "Total amount is required."
        }),
    onlineAmount: Joi.number().required(),
    cashAmount: Joi.number().required(),
    discount: Joi.number().min(0).required(),
    dueAmount: Joi.number()
        // .required()
        .messages({
            "number.base": "Due amount should be a number.",
            "any.required": "Due amount is required."
        }),
    invoiceDate: Joi.date().max('now').required(), // Invoice date must not be in the future
    dueDate: Joi.date().greater(Joi.ref('invoiceDate')).required(), // Due date must be after invoice date
    status: Joi.string()
        .valid('paid', 'unpaid') // Only allow 'paid' or 'unpaid'
        .default('unpaid')
        .messages({
            "string.base": "Status should be a string.",
            "any.only": "Status must be either 'paid' or 'unpaid'."
        }),
});

module.exports = billValidationSchema;
