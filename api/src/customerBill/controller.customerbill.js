const billService = require("./service.customerbill");
const ProductService = require("../products/service.product");

const billController = {};

// Create a new bill
billController.createBill = async (req, res) => {
  try {
    const userId = req._id;
    const {
      customerId,
      products,
      discountAmount,
      onlineAmount,
      cashAmount,
      dueDate,
    } = req.body;

    const invoiceNumber = `INV-${Date.now()}`;
    const invoiceDate = new Date();

    let totalAmount = 0;
    for (const product of products) {
      const productData = await ProductService.getSingleProduct(
        product.productId,
        userId
      );
      totalAmount += productData.price * product.quantity;
    }
    const discountedAmount = totalAmount - discountAmount;
    const totalReceivedAmount = onlineAmount + cashAmount;

    if (totalReceivedAmount > discountedAmount) {
      return res.send({
        status: false,
        msg: "Total received amount cannot exceed discounted amount",
      });
    }

    if (dueDate && new Date(dueDate) <= new Date()) {
      return res.send({ status: false, msg: "Due date must be in the future" });
    }

    const dueAmount = Math.max(0, discountedAmount - totalReceivedAmount);
    const status = dueAmount > 0 ? "Unpaid" : "Paid";

    const newBill = await billService.createBill({
      invoiceNumber,
      invoiceDate,
      customerId,
      products,
      totalAmount,
      discountAmount,
      discountedAmount,
      onlineAmount,
      cashAmount,
      dueAmount,
      dueDate,
      status,
      userId,
    });
    res.send({ status: true, msg: "Bill created successfully", data: newBill });
  } catch (error) {
    console.error(error);
    res.send({
      status: false,
      msg: "Failed to create bill",
      error: error.message,
    });
  }
};

// Get a bill by ID
billController.getSingleBill = async (req, res) => {
  const { billId } = req.params;
  const userId = req._id;
  try {
    const bill = await billService.getSingleBill(billId, userId);
    if (!bill) {
      return res.send({ status: false, msg: "Bill not found" });
    }
    if (bill.isDeleted) {
      return res.send({ status: false, msg: "Bill has been deleted" });
    }
    res.send({ status: true, msg: "Bill fetched successfully", data: bill });
  } catch (error) {
    console.error(error);
    res.send({
      status: false,
      msg: "Failed to fetch bill",
      error: error.message,
    });
  }
};

// Get all bills
billController.getAllBills = async (req, res) => {
  try {
    const userId = req._id;
    const bills = await billService.getAllBills(userId);
    if (!bills.length) {
      return res.send({ status: false, msg: "No bills found" });
    }
    res.send({ status: true, msg: "Bills fetched successfully", data: bills });
  } catch (error) {
    console.error(error);
    res.send({
      status: false,
      msg: "Failed to fetch bills",
      error: error.message,
    });
  }
};

// Update a bill by ID
billController.updateBill = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBill = await billService.updateBill(id, req.body);
    if (!updatedBill) {
      return res.send({ status: false, msg: "Bill not found" });
    }
    res.send({
      status: true,
      msg: "Bill updated successfully",
      data: updatedBill,
    });
  } catch (error) {
    console.error(error);
    res.send({
      status: false,
      msg: "Failed to update bill",
      error: error.message,
    });
  }
};

// Delete a bill by ID (soft delete)
billController.deleteBill = async (req, res) => {
  try {
    const result = await billService.deleteBill(req.params.billId, req._id);
    if (!result) {
      return res.send({ status: false, msg: "Bill not found" });
    }
    res.send({ status: true, msg: "Bill deleted successfully" });
  } catch (error) {
    console.error(error);
    res.send({
      status: false,
      msg: "Failed to delete bill",
      error: error.message,
    });
  }
};

module.exports = billController;
