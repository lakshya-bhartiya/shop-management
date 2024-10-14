const Bill = require("../customerBill/model.customerbill");

const userInvoicesService = {};

// Get all invoices created by a specific user
userInvoicesService.getInvoicesByUser = async (userId) => {
  const invoices = await Bill.find({ createdBy: userId, isDeleted: false })
    .populate("customerId") // Populate customer details if needed
    .populate("products.productId"); // Populate product details if needed

  return invoices;
};

module.exports = userInvoicesService;