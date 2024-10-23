// controllers/invoiceTransactionController.js
const invoiceTransactionService = require("./service.invoiceTransaction");

const invoiceTransactionController = {};

// Controller to get all combined transactions (invoices and payments)
invoiceTransactionController.getCombinedTransactionsByDate = async (req, res) => {
    try {
        const transactions = await invoiceTransactionService.getCombinedTransactionsByDate();
        res.send({
            status: true,
            msg: "Combined transactions fetched successfully",
            data: transactions,
        });
    } catch (error) {
        console.error(error);
        res.send({ status: false, msg: "Failed to fetch combined transactions", error: error.message });
    }
};
module.exports = invoiceTransactionController;