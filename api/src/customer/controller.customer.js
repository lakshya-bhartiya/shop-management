const customerService = require("./service.customer");

const customerController = {};

// Create a new customer
customerController.createCustomer = async (req, res) => {
    const { name, address, mobile } = req.body;
    const { isDeleted } = req.query
    const userId = req._id;

    const existingCustomer = await customerService.getCustomerByMobile(mobile)
    console.log(existingCustomer, "before")
    if (existingCustomer) {
        if (existingCustomer.isDeleted) {
            console.log(existingCustomer._id, "after") // Update address if provided // Save changes and return reactivated customer
            // Reactivate the deleted customer
            customerService.editCustomer(existingCustomer._id, { isDeleted: false })
            existingCustomer.isDeleted = false; // Set isDeleted to false
            existingCustomer.name = name; // Update name if provided
            existingCustomer.address = address;
            return res.send({ status: true, msg: "customer created successfully", data: existingCustomer })
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

// Get all customers
customerController.getCustomers = async (req, res) => {
    const userId = req._id; // Ensure this is set by your authentication middleware
    try {
        const getAllCustomers = await customerService.getAllCustomer(userId);
        res.send({ status: true, data: getAllCustomers });
    } catch (err) {
        console.error(err);
        res.send({ status: false, msg: "Something went wrong", data: null });
    }
};


customerController.getSingleCustomer = async (req, res) => {
    const { id } = req.params
    try {
        const getSingleCustomer = await customerService.getSingleCustomer(id);

        if (!getSingleCustomer || getSingleCustomer.isDeleted) {
            return res.send({ msg: "customer not found or has been deleted", data: null, status: false });
        }

        return res.send({ status: true, msg: "customer data retrieved", data: getSingleCustomer });
    } catch (err) {
        console.log(err);
        return res.send({ status: false, data: [], error: err });
    }
}

// Soft delete a customer
customerController.deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCustomer = await customerService.deleteCustomer(id);
        if (!deletedCustomer) {
            return res.send({ status: false, msg: "Customer not found" });
        }
        res.send({ status: true, msg: "Customer deleted successfully" });
    } catch (err) {
        console.error(err);
        res.send({ status: false, msg: "Something went wrong", error: err.message });
    }
};

// Edit customer details
customerController.editCustomer = async (req, res) => {
    const { id } = req.params; // Get customer ID from request parameters
    const { name, address, mobile } = req.body; // Get updated data from request body

    try {
        const updatedCustomer = await customerService.editCustomer(id, { name, address, mobile });

        if (!updatedCustomer) {
            return res.send({ status: false, msg: "Customer not found" });
        }

        res.send({ status: true, msg: "Customer updated successfully", data: updatedCustomer });
    } catch (error) {
        console.error(error);
        res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
};


// Get total customer count
customerController.getCustomerCount = async (req, res) => {
    const userId = req._id; // Ensure this is set by your authentication middleware
    try {
        const customerCount = await customerService.countCustomers(userId);
        res.send({ status: true, msg: "Customer count retrieved successfully", data: { count: customerCount } });
    } catch (err) {
        console.error(err);
        res.send({ status: false, msg: "Something went wrong", data: null });
    }
};

module.exports = customerController;