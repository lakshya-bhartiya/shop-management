// services/paymentService.js
const Payment = require("./model.customerRemainingAmount");
const Bill = require("../customerBill/model.customerbill");
const ReceivedAmount = require("../invoiceTransaction/model.invoiceTransaction")

const paymentService = {};

// Process a payment
paymentService.processPayment = async (paymentData) => {
    const { amount, billId } = paymentData;

    // Find the bill
    const bill = await Bill.findById(billId).populate("customerId")
    console.log(bill)
    if (!bill || bill.isDeleted) {
        throw new Error("Bill not found or has been deleted.");
    }

    // Update the bill status and amounts
    const totalReceivedAmount = bill.onlineAmount + bill.cashAmount + amount;
    const dueAmount = Math.max(0, bill.discountedAmount - totalReceivedAmount);

    // Update the bill with new amounts
    bill.onlineAmount += amount; // Assuming payment is online for simplicity
    bill.dueAmount = dueAmount;
    bill.status = dueAmount > 0 ? "Unpaid" : "Paid";

    await bill.save();

    // Create a new payment record without customerId
    const newPayment = await Payment.create({
        amount,
        billId,
        customerId: bill.customerId
    });

    await ReceivedAmount.create({
        invoiceNumber: bill.invoiceNumber,
        paymentId: newPayment._id, // Link to this payment
       receivedAmount: amount,
       customerId: bill.customerId
    });

    return { newPayment, updatedBill: bill };
};
module.exports = paymentService;