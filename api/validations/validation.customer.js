const Joi = require("joi");

  const customerValidationSchema = Joi.object({
    name: Joi.string().required().messages({
      "string.base": `"name" should be a type of 'text'`,
      "string.empty": `"name" cannot be an empty field`,
      "any.required": `"name" is a required field`,
    }),
    address: Joi.string().required().messages({
      "string.base": `"address" should be a type of 'text'`,
      "string.empty": `"address" cannot be an empty field`,
      "any.required": `"address" is a required field`,
    }),
    mobile: Joi.string()
        .pattern(/^[6-9]\d{9}$/) // Ensures mobile starts with 6, 7, 8, or 9 and is 10 digits long
        .required()
        .messages({
            "string.pattern.base": "Mobile number must start with 6, 7, 8, or 9 and be 10 digits long",
        }),
    isDeleted: Joi.boolean().default(false),
  });

module.exports = customerValidationSchema;
