const Customer = require("./model.customer");

const customerService = {};

// Create a new customer
customerService.createCustomer = async ({ userId, name, address, mobile }) => {
    return await Customer.create({ userId, name, address, mobile });
};

// Get all customers for a specific user
customerService.getAllCustomer = async (userId) => {
    return await Customer.find({ userId, isDeleted: false });
};

// Get a customer by mobile number
customerService.getCustomerByMobile = async (mobile) => {
    return await Customer.findOne({ mobile });
};

// Soft delete a customer
customerService.deleteCustomer = async (id) => {
    return await Customer.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

// Edit customer details
customerService.editCustomer = async (id, updateData) => {
    return await Customer.findByIdAndUpdate(
        id,
        { ...updateData },
        { new: true, runValidators: true } // Return the updated document and run validators
    );
};

module.exports = customerService;