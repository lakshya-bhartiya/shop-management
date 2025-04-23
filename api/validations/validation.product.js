// validations/product.validation.js

const Joi = require("joi");

const productValidationSchema = Joi.object({
  name: Joi.string()
    .trim()
    .required()
    .messages({
      "string.base": "Product name should be a string.",
      "string.empty": "Product name is required.",
      "any.required": "Product name is required."
    }),

  price: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base": "Price should be a number.",
      "number.min": "Price cannot be negative.",
      "any.required": "Price is required."
    }),

  stock: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base": "Stock should be a number.",
      "number.min": "Stock cannot be negative.",
      "any.required": "Stock is required."
    }),
  categoryId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Category ID must be a valid ObjectId.",
      "any.required": "Category ID is required."
    }),

  vendorId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Vendor ID must be a valid ObjectId.",
      "any.required": "Vendor ID is required."
    }),

  isDeleted: Joi.boolean().optional()
});


const updateStockValidation = Joi.object({
    quantity: Joi.number()
      .positive()
      .required()
      .messages({
        "number.base": "Quantity must be a number.",
        "number.positive": "Quantity must be greater than 0.",
        "any.required": "Quantity is required."
      }),
  
    action: Joi.string()
      .valid("add", "remove")
      .required()
      .messages({
        "string.base": "Action must be a string.",
        "any.only": "Action must be either 'add' or 'remove'.",
        "any.required": "Action is required."
      })
  });

module.exports = {productValidationSchema, updateStockValidation};
