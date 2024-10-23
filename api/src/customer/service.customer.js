const Customer = require("./model.customer");

const customerService = {};

customerService.createCustomer = async ({ userId, name, address, mobile }) => {
    return await Customer.create({ userId, name, address, mobile });
};

customerService.getAllCustomer = async (userId) => {
    return await Customer.find({ userId, isDeleted: false });
};

customerService.getCustomerByMobile = async (mobile) => {
    return await Customer.findOne({ mobile });
};

customerService.getSingleCustomer = async (id) => {
    const singleCustomer = await Customer.findById(id)
    return singleCustomer
}

customerService.deleteCustomer = async (id) => {
    return await Customer.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

customerService.editCustomer = async (id, updateData) => {
    return await Customer.findByIdAndUpdate(
        id,
        { ...updateData },
        { new: true, runValidators: true }
    );
};

customerService.countCustomers = async (userId) => {
    return await Customer.countDocuments({ userId, isDeleted: false });
};

module.exports = customerService;