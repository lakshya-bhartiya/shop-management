// controllers/paymentController.js
const paymentService = require("./service.customerRemainingAmount");

const paymentController = {};

// Process a payment
paymentController.makePayment = async (req, res) => {
    try {
        const { amount } = req.body; // Extract amount from the request body
        const { billId } = req.params; // Extract billId from request parameters

        const result = await paymentService.processPayment({ amount, billId });
        
        res.send({ status: true, msg: "Payment processed successfully", data: result });
    } catch (error) {
        console.error(error);
        res.send({ status: false, msg: "Failed to process payment", error: error.message });
    }
};

module.exports = paymentController;