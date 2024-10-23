const billService = require("./service.customerbill");

const billController = {};

// Create a new bill
billController.createBill = async (req, res) => {
  try {
    const newBill = await billService.createBill(req.body);
    res.send({ status: true, msg: "Bill created successfully", data: newBill });
  } catch (error) {
    console.error(error);
    res.send({ status: false, msg: "Failed to create bill", error: error.message });
  }
};

// Get a bill by ID
billController.getSingleBill = async (req, res) => {
  const {billId} = req.params
  try {
    const bill = await billService.getBillById(billId);
    console.log(bill)

    console.log(bill.onlineAmount)
    res.send({ status: true, msg: "Bill fetched successfully", data: bill });
  } catch (error) {
    console.error(error);
    res.send({ status: false, msg: "Failed to fetch bill", error: error.message });
  }
};

// Get all bills
billController.getAllBills = async (req, res) => {
  try {
    const bills = await billService.getAllBills();
    res.send({ status: true, msg: "Bills fetched successfully", data: bills });
  } catch (error) {
    console.error(error);
    res.send({ status: false, msg: "Failed to fetch bills", error: error.message });
  }
};

// Update a bill by ID
billController.updateBill = async (req, res) => {
  const {id} = req.params
  try {
    const updatedBill = await billService.updateBill(id, req.body);
    res.send({ status: true, msg: "Bill updated successfully", data: updatedBill });
  } catch (error) {
    console.error(error);
    res.send({ status: false, msg: "Failed to update bill", error: error.message });
  }
};

// Delete a bill by ID (soft delete)
billController.deleteBill = async (req, res) => {
  try {
    const result = await billService.deleteBill(req.params.billId);
    res.send({ status: true, msg: result.msg });
  } catch (error) {
    console.error(error);
    res.send({ status: false, msg: "Failed to delete bill", error: error.message });
  }
};

// Add this method in your billController
billController.getTotalReceivedAmount = async (req, res) => {
  try {
    const { period } = req.params; // Expecting period as a URL parameter
    const totalReceivedAmount = await billService.getTotalReceivedAmount(period);
    
    res.send({
      status: true,
      msg: `Total received amount for the last ${period}:`,
      data: totalReceivedAmount,
    });
  } catch (error) {
    console.error(error);
    res.send({ status: false, msg: "Failed to fetch total received amount", error: error.message });
  }
};

// Add this method in your billController
billController.getTotalBillCount = async (req, res) => {
  try {
    const { period } = req.params; // Expecting period as a URL parameter
    const totalBillCount = await billService.getTotalBillCount(period);
    
    res.send({
      status: true,
      msg: `Total bill count for the last ${period}:`,
      data: totalBillCount,
    });
  } catch (error) {
    console.error(error);
    res.send({ status: false, msg: "Failed to fetch total bill count", error: error.message });
  }
};

// Add this method in your billController
billController.getTotalBillsForCustomer = async (req, res) => {
  try {
    const { customerId } = req.params; // Expecting customerId as a URL parameter
    const totalBillCount = await billService.getTotalBillsForCustomer(customerId);
    
    res.send({
      status: true,
      msg: `Total bills for customer ${customerId}:`,
      data: totalBillCount,
    });
  } catch (error) {
    console.error(error);
    res.send({ status: false, msg: "Failed to fetch total bills for customer", error: error.message });
  }
};

// Add these methods in your billController

// Get total received amount for a customer
billController.getTotalReceivedAmountForCustomer = async (req, res) => {
  try {
    const { customerId } = req.params; // Expecting customerId as a URL parameter
    const totalReceivedAmount = await billService.getTotalReceivedAmountForCustomer(customerId);
    
    res.send({
      status: true,
      msg: `Total received amount for customer ${customerId}:`,
      data: totalReceivedAmount,
    });
  } catch (error) {
    console.error(error);
    res.send({ status: false, msg: "Failed to fetch total received amount for customer", error: error.message });
  }
};

// Get total due amount for a customer
billController.getTotalDueAmountForCustomer = async (req, res) => {
  try {
    const { customerId } = req.params; // Expecting customerId as a URL parameter
    const totalDueAmount = await billService.getTotalDueAmountForCustomer(customerId);
    
    res.send({
      status: true,
      msg: `Total due amount for customer ${customerId}:`,
      data: totalDueAmount,
    });
  } catch (error) {
    console.error(error);
    res.send({ status: false, msg: "Failed to fetch total due amount for customer", error: error.message });
  }
};

billController.getInvoicesForCustomer = async (req, res) => {
  try {
    const { customerId } = req.params; // Expecting customerId as a URL parameter
    const invoices = await billService.getInvoicesForCustomer(customerId);

    res.send({
      status: true,
      msg: `Invoices fetched successfully for customer ${customerId}`,
      data: invoices,
    });
  } catch (error) {
    console.error(error);
    res.send({ status: false, msg: "Failed to fetch invoices", error: error.message });
  }
};

module.exports = billController;