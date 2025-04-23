const Joi = require("joi");
const mongoose = require("mongoose");

const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

const billValidationSchema = Joi.object({
  invoiceNumber: Joi.string(),
  invoiceDate: Joi.date(), // optional, defaults to current date
  customerId: Joi.string().custom(objectId).required(),
  products: Joi.array().items(
    Joi.object({
      productId: Joi.string().custom(objectId).required(),
      quantity: Joi.number().integer().positive().required()
    })
  ).min(1).required(),
  totalAmount: Joi.number(),
  discountAmount: Joi.number().min(0).default(0),
  discountedAmount: Joi.number(),
  onlineAmount: Joi.number().min(0).default(0),
  cashAmount: Joi.number().min(0).default(0),
  dueAmount: Joi.number().min(0).default(0),
  dueDate: Joi.alternatives().conditional('dueAmount', {
    is: Joi.number().greater(0),
    then: Joi.date().required(),
    otherwise: Joi.date().optional().allow(null)
  }),
  status: Joi.string().valid("Paid", "Unpaid").default("Unpaid"),
  userId: Joi.string().custom(objectId),
});

module.exports =  billValidationSchema ;
