const customerService = require("./service.customer");

const customerController = {};

// Create a new customer
customerController.createCustomer = async (req, res) => {
    const { name, address, mobile } = req.body;
    const userId = req._id; // Ensure this is set by your authentication middleware

    // Validate that all required fields are present
    if (!name || !address || !mobile) {
        return res.status(400).json({
            status: "ERR",
            msg: "All fields (name, address, mobile) are required."
        });
    }

    try {
        const newCustomer = await customerService.createCustomer({ userId, name, address, mobile });
        res.status(201).json({ status: "OK", msg: "Customer created successfully", data: newCustomer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "ERR", msg: "Something went wrong", error: error.message });
    }
};

// Get all customers
customerController.getCustomers = async (req, res) => {
    const userId = req._id; // Ensure this is set by your authentication middleware
    try {
        const getAllCustomers = await customerService.getAllCustomer(userId);
        res.status(200).json({ status: "OK", data: getAllCustomers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "ERR", msg: "Something went wrong", data: null });
    }
};

// Soft delete a customer
customerController.deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCustomer = await customerService.deleteCustomer(id);
        if (!deletedCustomer) {
            return res.status(404).json({ status: "ERR", msg: "Customer not found" });
        }
        res.status(200).json({ status: "OK", msg: "Customer deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "ERR", msg: "Something went wrong", error: err.message });
    }
};

// Edit customer details
customerController.editCustomer = async (req, res) => {
    const { id } = req.params; // Get customer ID from request parameters
    const { name, address, mobile } = req.body; // Get updated data from request body

    try {
        const updatedCustomer = await customerService.editCustomer(id, { name, address, mobile });

        if (!updatedCustomer) {
            return res.status(404).json({ status: "ERR", msg: "Customer not found" });
        }

        res.status(200).json({ status: "OK", msg: "Customer updated successfully", data: updatedCustomer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "ERR", msg: "Something went wrong", error: error.message });
    }
};

module.exports = customerController;