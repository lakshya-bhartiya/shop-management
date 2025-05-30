const customerService = require("./service.customer");

const customerController = {};

customerController.createCustomer = async (req, res) => {
    const { name, address, mobile } = req.body;
    const userId = req._id;

    const existingCustomer = await customerService.getCustomerByMobile(mobile)
    if (existingCustomer) {
        if (existingCustomer.isDeleted) {
            const restoredCustomer = await customerService.editSoftDeletedCustomer(
                existingCustomer._id,
                userId,
                {
                    name,
                    address,
                    mobile,
                    isDeleted: false
                }
            );
            return res.send({ status: true, msg: "customer created successfully", data: restoredCustomer });
        } else {
            return res.send({ status: false, msg: "customer is already exist", data: null })
        }
    }
    try {
        const newCustomer = await customerService.createCustomer({ userId, name, address, mobile });
        res.send({ status: true, msg: "Customer created successfully", data: newCustomer });
    } catch (error) {
        console.error(error);
        res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
};

customerController.getCustomers = async (req, res) => {
    const userId = req._id;
    try {
        const getAllCustomers = await customerService.getAllCustomer(userId);
        res.send({ status: true, data: getAllCustomers });
    } catch (err) {
        console.error(err);
        res.send({ status: false, msg: "Something went wrong", data: null });
    }
};


customerController.getSingleCustomer = async (req, res) => {
    const userId = req._id;
    const { id } = req.params
    try {
        const getSingleCustomer = await customerService.getSingleCustomer(id, userId);

        if (!getSingleCustomer || getSingleCustomer.isDeleted) {
            return res.send({ msg: "customer not found or has been deleted", data: null, status: false });
        }

        return res.send({ status: true, msg: "customer data retrieved", data: getSingleCustomer });
    } catch (err) {
        console.log(err);
        return res.send({ status: false, data: [], error: err });
    }
}

customerController.deleteCustomer = async (req, res) => {
    const userId = req._id;
    const { id } = req.params;
    try {
        const deletedCustomer = await customerService.deleteCustomer(id, userId);
        if (!deletedCustomer) {
            return res.send({ status: false, msg: "Customer not found" });
        }
        res.send({ status: true, msg: "Customer deleted successfully" });
    } catch (err) {
        console.error(err);
        res.send({ status: false, msg: "Something went wrong", error: err.message });
    }
};

customerController.editCustomer = async (req, res) => {
    const userId = req._id;
    const { id } = req.params; 
    const { name, address, mobile } = req.body; 

    try {
        const updatedCustomer = await customerService.editCustomer(id, userId, { name, address, mobile });

        if (!updatedCustomer) {
            return res.send({ status: false, msg: "Customer not found" });
        }

        res.send({ status: true, msg: "Customer updated successfully", data: updatedCustomer });
    } catch (error) {
        console.error(error);
        res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
};


customerController.getCustomerCount = async (req, res) => {
    const userId = req._id;
    try {
        const customerCount = await customerService.countCustomers(userId);
        res.send({ status: true, msg: "Customer count retrieved successfully", data: { count: customerCount } });
    } catch (err) {
        console.error(err);
        res.send({ status: false, msg: "Something went wrong", data: null });
    }
};

module.exports = customerController;