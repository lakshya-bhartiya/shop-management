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

customerService.getSingleCustomer = async (id, userId) => {
    return await Customer.findOne({ _id: id, userId, isDeleted: false });
};


customerService.deleteCustomer = async (id, userId) => {
    return await Customer.findOneAndUpdate(
        { _id: id, userId, isDeleted: false },
        { isDeleted: true },
        { new: true }
    );
};


customerService.editCustomer = async (id, userId, updateData) => {
    return await Customer.findOneAndUpdate(
        { _id: id, userId, isDeleted: false },
        { ...updateData },
        { new: true, runValidators: true }
    );
};


customerService.editSoftDeletedCustomer = async (id, userId, updateData) => {
    return await Customer.findOneAndUpdate(
        { _id: id, userId, isDeleted: true }, // ensure it belongs to user and is soft-deleted
        { ...updateData },
        { new: true, runValidators: true }
    );
};



customerService.countCustomers = async (userId) => {
    return await Customer.countDocuments({ userId, isDeleted: false });
};

module.exports = customerService;