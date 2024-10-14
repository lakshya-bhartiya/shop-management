const userInvoicesService = require("./service.invoiceTransaction");

const userInvoicesController = {};

// Get all invoices created by a specific user
userInvoicesController.getInvoicesByUser = async (req, res) => {
  try {
    const { userId } = req._id; // Expecting userId as a URL parameter
    const invoices = await userInvoicesService.getInvoicesByUser(userId);

    res.send({
      status: true,
      msg: `Invoices fetched successfully for user ${userId}`,
      data: invoices,
    });
  } catch (error) {
    console.error(error);
    res.send({ status: false, msg: "Failed to fetch invoices", error: error.message });
  }
};

module.exports = userInvoicesController;