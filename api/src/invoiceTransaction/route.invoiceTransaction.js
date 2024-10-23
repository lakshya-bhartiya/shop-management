const express = require("express");
const invoiceTransactionController = require("./controller.invoiceTransaction");

const router = express.Router();

// Route to get all invoice transactions (no grouping)
router.get(
  "/invoicesWithReceivedAmounts",
  invoiceTransactionController.getCombinedTransactionsByDate
);

module.exports = router;
