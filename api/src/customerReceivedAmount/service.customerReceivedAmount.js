const Bill = require("../customerBill/model.customerbill");
const Customer = require("../customer/model.customer"); // Adjust path as necessary

const receivedInvoiceService = {};

// Get received amounts for all invoices of a specific customer
receivedInvoiceService.getReceivedInvoicesForCustomer = async (customerId) => {
  const bills = await Bill.find({ customerId, isDeleted: false });

  const receivedInvoices = await Promise.all(
    bills.map(async (bill) => {
      const customerData = await Customer.findById(customerId);
      return {
        invoiceNumber: bill.invoiceNumber,
        customerName: customerData.name,
        receivedAmount: bill.onlineAmount + bill.cashAmount,
        date: bill.invoiceDate,
        dueAmount: bill.dueAmount,
        totalAmount: bill.totalAmount
      };
    })
  );

  return receivedInvoices;
};

module.exports = receivedInvoiceService;