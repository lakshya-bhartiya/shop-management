const Joi = require("joi");

const billValidationSchema = Joi.object({
    invoiceNumber: Joi.string()
        .required()
        .messages({
            "string.base": "Invoice number should be a string.",
            "string.empty": "Invoice number is required.",
            "any.required": "Invoice number is required."
        }),
    customer: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/) // Mongoose ObjectId is a 24-character hex string
        .required()
        .messages({
            "string.base": "Customer should be a string (ObjectId).",
            "string.pattern.base": "Customer should be a valid ObjectId.",
            "any.required": "Customer is required."
        }),
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
                .required()
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
        .required()
        .messages({
            "number.base": "Total amount should be a number.",
            "any.required": "Total amount is required."
        }),
    paymentMethod: Joi.string()
        .required()
        .messages({
            "string.base": "Payment method should be a string.",
            "any.required": "Payment method is required."
        }),
    amountReceived: Joi.number()
        .required()
        .messages({
            "number.base": "Amount received should be a number.",
            "any.required": "Amount received is required."
        }),
    dueAmount: Joi.number()
        .required()
        .messages({
            "number.base": "Due amount should be a number.",
            "any.required": "Due amount is required."
        }),
    status: Joi.string()
        .valid('paid', 'unpaid') // Only allow 'paid' or 'unpaid'
        .default('unpaid')
        .messages({
            "string.base": "Status should be a string.",
            "any.only": "Status must be either 'paid' or 'unpaid'."
        }),
});

module.exports = billValidationSchema;
