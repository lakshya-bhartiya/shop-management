const customerService = require("./service.customer");

const customerController = {};

customerController.createCustomer = async (req, res) => {
  try {
    const newCustomer = await customerService.createCustomer(req.body);
    res.status(201).json({ status: "OK", msg: "Customer created successfully", data: newCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "ERR", msg: "Something went wrong", error: error.message });
  }
};

module.exports = customerController;