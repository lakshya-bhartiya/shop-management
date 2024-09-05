const Customer = require("./model.customer");

const customerService = {};

customerService.createCustomer = async (customerData) => {
  return await Customer.create(customerData);
};

customerService.getCustomerByMobile = async (mobile) => {
  return await Customer.findOne({ mobile });
};

module.exports = customerService;