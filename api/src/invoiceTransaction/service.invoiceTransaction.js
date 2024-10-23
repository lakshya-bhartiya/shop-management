// services/invoiceTransactionService.js
const InvoiceTransaction = require("../customerBill/model.customerbill"); // Adjust path as necessary
const PaymentTransaction = require("../customerRemainingPayment/model.customerRemainingAmount")

const invoiceTransactionService = {};

// Fetch all invoice transactions with invoice number, date, and received amount
invoiceTransactionService.getAllInvoiceTransactions = async () => {

    const invoices = await InvoiceTransaction.find({ isDeleted: false })
        .populate("customerId", "name")

    // console.log(invoices,"invoices")

    // Transforming the data to match the desired structure
    const formattedInvoices = invoices.map(invoice => ({
        invoiceNumber: invoice.invoiceNumber,
        invoiceDate: invoice.invoiceDate,
        receivedAmount: invoice.cashAmount+invoice.onlineAmount,
        customerName: invoice.customerId.name,
    }));

    return formattedInvoices;
};


invoiceTransactionService.getAllPaymentTransactions = async () => {
    // const payments = await PaymentTransaction.find({}).populate("billId").populate("customerId");
    const payments = await PaymentTransaction.find({})
        .populate("billId")
        .populate("customerId", "name")

    console.log(payments,"payments")

    // Transforming the data to match the desired structure
    const formattedInvoices = payments.map(payment => ({
        invoiceNumber: payment.billId.invoiceNumber,
        invoiceDate: payment.paymentDate,
        receivedAmount: payment.amount,
        customerName: payment.customerId ? payment.customerId.name : "Unknown",
    }));

    return formattedInvoices;
};

// Combine both invoice and payment transactions by date
invoiceTransactionService.getCombinedTransactionsByDate = async () => {
    const invoices = await invoiceTransactionService.getAllInvoiceTransactions();
    const payments = await invoiceTransactionService.getAllPaymentTransactions();

    // Combine both arrays
    const combinedTransactions = [...invoices, ...payments];

    // Sort combined transactions by date
    combinedTransactions.sort((a, b) => new Date(a.invoiceDate) - new Date(b.invoiceDate));

    return combinedTransactions;
};

module.exports = invoiceTransactionService;