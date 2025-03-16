const Bill = require("./model.customerbill");
const Product = require("../products/model.product");
const Payment = require("../customerRemainingPayment/model.customerRemainingAmount")
const ReceivedAmount = require("../invoiceTransaction/model.invoiceTransaction")

const billService = {};
// Create a new bill
billService.createBill = async (billData) => {
  const { customerId, products, discountAmount, onlineAmount, cashAmount, dueDate } = billData;

  // Calculate total amount based on product prices and quantities
  let totalAmount = 0;
  for (const product of products) {
    const productData = await Product.findById(product.productId);
    totalAmount += productData.sellingPrice * product.quantity;
  }

  console.log("Total Amount:", totalAmount);
  console.log("Discount Amount:", discountAmount);
  console.log("Online Amount:", onlineAmount);
  console.log("Cash Amount:", cashAmount);

  const discountedAmount = totalAmount - discountAmount;
  const totalReceivedAmount = onlineAmount + cashAmount;

  console.log("Discounted Amount:", discountedAmount);
  console.log("Total Received Amount:", totalReceivedAmount);


  const dueAmount = Math.max(0, discountedAmount - totalReceivedAmount);

  console.log("Due Amount:", dueAmount);

  if (dueAmount === 0 && totalReceivedAmount > discountedAmount) {
    console.log("Overpayment detected. No due amount.");
  } else {
    console.log("Due Amount:", dueAmount);
  }

  const invoiceNumber = `INV-${Date.now()}`;

  const newBill = await Bill.create({
    invoiceNumber,
    customerId,
    products,
    totalAmount,
    discountAmount,
    discountedAmount,
    onlineAmount,
    cashAmount,
    dueAmount,
    dueDate: (dueAmount > 0 && dueDate) ? (dueDate || null) : null,
    status: dueAmount > 0 ? "Unpaid" : "Paid",
  })

  console.log(newBill, "new bill")

  if (totalReceivedAmount > 0) {
    await ReceivedAmount.create({
      invoiceNumber: newBill.invoiceNumber,
      paymentId: null, // No payment ID yet since this is during creation
      receivedAmount: totalReceivedAmount,
      customerId: customerId,
    });
  }

  return newBill;
};

// Get a single bill by ID
billService.getBillById = async (billId) => {
  const bill = await Bill.findById(billId, { isDeleted: false }).populate("customerId").populate("products.productId")
  return bill;
};

// Get all bills
billService.getAllBills = async () => {
  const bills = await Bill.find({ isDeleted: false }).populate("customerId").populate("products.productId")
  return bills;
};

// Update a bill by ID
billService.updateBill = async (id, updateData) => {
  const updatedBill = await Bill.findByIdAndUpdate(id, updateData, { new: true, runValidators: true, isDeleted: false })
  return updatedBill
};

// Delete (soft delete) a bill by ID
billService.deleteBill = async (billId) => {
  const bill = await Bill.findById(billId);
  if (!bill || bill.isDeleted) {
    throw new Error("Bill not found or has been deleted.");
  }

  // Soft delete the bill
  bill.isDeleted = true;
  await bill.save();

  return { msg: "Bill has been deleted successfully" };
};

// Add this function in your billService
billService.getTotalReceivedAmount = async (period) => {
  const now = new Date();
  let startDate;

  switch (period) {
    case 'day':
      startDate = new Date(now.setDate(now.getDate() - 1));
      break;
    case 'week':
      startDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case 'month':
      startDate = new Date(now.setMonth(now.getMonth() - 1));
      break;
    case 'year':
      startDate = new Date(now.setFullYear(now.getFullYear() - 1));
      break;
    default:
      throw new Error("Invalid period specified");
  }

  const payments = await Payment.find({
    paymentDate: { $gte: startDate, $lte: new Date() },
  });

  // Calculate total amount received including due payments
  const totalPaymentReceived = payments.reduce((total, payment) => total + payment.amount, 0);

  const bills = await Bill.find({
    createdAt: { $gte: startDate, $lte: new Date() },
    isDeleted: false,
  });

  const totalReceivedAmount = bills.reduce((total, bill) => {
    return total + (bill.onlineAmount + bill.cashAmount);
  }, 0);

  return totalReceivedAmount + totalPaymentReceived;
};

// Add this function in your billService
billService.getTotalBillCount = async (period) => {
  const now = new Date();
  let startDate;

  switch (period) {
    case 'day':
      startDate = new Date(now.setDate(now.getDate() - 1));
      break;
    case 'week':
      startDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case 'month':
      startDate = new Date(now.setMonth(now.getMonth() - 1));
      break;
    case 'year':
      startDate = new Date(now.setFullYear(now.getFullYear() - 1));
      break;
    default:
      throw new Error("Invalid period specified");
  }

  const billCount = await Bill.countDocuments({
    createdAt: { $gte: startDate, $lte: new Date() },
    isDeleted: false,
  });

  return billCount;
};

// Add this function in your billService
billService.getTotalBillsForCustomer = async (customerId) => {
  const billCount = await Bill.countDocuments({
    customerId: customerId,
    isDeleted: false,
  });

  return billCount;
};

// Add these functions in your billService

// Function to get total received amount for a customer
billService.getTotalReceivedAmountForCustomer = async (customerId) => {
  const bills = await Bill.find({
    customerId: customerId,
    isDeleted: false,
  });

  const totalReceivedAmount = bills.reduce((total, bill) => {
    return total + (bill.onlineAmount + bill.cashAmount);
  }, 0);

  return totalReceivedAmount;
};

// Function to get total due amount for a customer
billService.getTotalDueAmountForCustomer = async (customerId) => {
  const bills = await Bill.find({
    customerId: customerId,
    isDeleted: false,
  });

  const totalDueAmount = bills.reduce((total, bill) => {
    return total + bill.dueAmount;
  }, 0);

  return totalDueAmount;
};
billService.getInvoicesForCustomer = async (customerId) => {
  const invoices = await Bill.find({ customerId, isDeleted: false })
    .populate("customerId", "name") // Assuming 'name' is a field in your Customer model
    .populate("products.productId", "name sellingPrice") // Adjust fields as necessary
    .select("invoiceNumber invoiceDate totalAmount discountAmount dueAmount status products dueDate");

  return invoices;
};
module.exports = billService;