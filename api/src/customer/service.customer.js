const Customer = require("./model.customer");

const customerService = {};

customerService.createCustomer = async (customerData) => {
  return await Customer.create(customerData);
};

customerService.getAllCustomer = async() => {
  return await Customer.find({})
}

customerService.getCustomerBillById = async (id) => {
  return await Customer.findOne({ id });
}

customerService.getCustomerByMobile = async (mobile) => {
  return await Customer.findOne({ mobile });
};
customerService.DeleteCustomer = async (id, updateField,) => {
  return Bill.findByIdAndUpdate({ _id: id }, { ...updateField }, { new: true })
}

module.exports = customerService;