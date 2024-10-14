const receivedInvoiceService = require("./service.customerReceivedAmount");

const receivedInvoiceController = {};

// Get all received invoices for a specific customer
receivedInvoiceController.getReceivedInvoicesForCustomer = async (req, res) => {
  try {
    const { customerId } = req.params; // Expecting customerId as a URL parameter
    const receivedInvoices = await receivedInvoiceService.getReceivedInvoicesForCustomer(customerId);

    res.send({
      status: true,
      msg: `Received invoices fetched successfully for customer ${customerId}`,
      data: receivedInvoices,
    });
  } catch (error) {
    console.error(error);
    res.send({ status: false, msg: "Failed to fetch received invoices", error: error.message });
  }
};

module.exports = receivedInvoiceController;