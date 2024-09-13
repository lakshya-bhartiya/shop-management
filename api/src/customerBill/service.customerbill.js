const Bill = require("./model.customerbill");
const Customer = require("../customer/model.customer")

const InvoiceCounter = require("../../helper/model.invoiceConter")

const billService = {}

billService.createBill = async (invoiceData) => {
  const { customer, customerName, products, onlineAmount, cashAmount, discount, dueDate, invoiceDate, userId } = invoiceData;

  // Increment the invoice counter to generate a new invoice number
  let invoiceCounter = await InvoiceCounter.findOneAndUpdate(
      {},
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
  );

  const invoiceNumber = "INV" + invoiceCounter.sequenceValue;

  // Check if the customer already exists
  let existingCustomer = await Customer.findOne({ mobile: customer.mobile });

  // If the customer doesn't exist, create a new customer with userId
  if (!existingCustomer) {
      existingCustomer = await Customer.create({ ...customer, userId }); // Include userId here
  }

  let totalAmount = 0;
  const updatedProducts = products.map(product => {
      const total = product.price * product.quantity; // Calculate total for each product
      totalAmount += total; // Add to overall total
      return { ...product, total }; // Update product with calculated total
  });

  // Calculate total amount and due amount
  const discountedAmount = totalAmount - discount;
  const totalAmountReceived = onlineAmount + cashAmount;
  const dueAmount = discountedAmount - totalAmountReceived;

  const status = dueAmount <= 0 ? 'paid' : 'unpaid';

  // Create the bill
  const newBill = await Bill.create({
      invoiceNumber,
      customer: existingCustomer._id,
      customerName,
      products: updatedProducts,
      totalAmount,
      discount,
      discountedAmount,
      onlineAmount,
      cashAmount,
      dueAmount,
      invoiceDate,
      dueDate,
      status,
      userId // Associate the bill with the user who created it
  });

  return newBill;
};



billService.getAllBills = async (userId) => {
  let bills = await Bill.find({userId})
  return bills
}

billService.getBillByInvoiceNo = async (invoiceNumber) => {
  const billByInvoice = await Bill.findOne({ invoiceNumber })
  return billByInvoice
}

billService.editBill = async (invoiceNumber, { customer, products, discount, onlineAmount, cashAmount, dueDate }) => {
  const existingBill = await Bill.findOne({ invoiceNumber });

  if (!existingBill) {
      throw new Error("Bill not found");
  }

  // Update the bill fields
  existingBill.customerName = customer.name; // Update customer name
  existingBill.customerMobile = customer.mobile; // Update customer mobile

  // Calculate total for each product and update products
  let totalAmount = 0;
  const updatedProducts = products.map(product => {
      const total = product.price * product.quantity; // Calculate total for each product
      totalAmount += total; // Add to overall total
      return { ...product, total }; // Include total in the product object
  });

  existingBill.products = updatedProducts; // Update products
  existingBill.discount = discount; // Update discount
  existingBill.onlineAmount = onlineAmount; // Update online amount
  existingBill.cashAmount = cashAmount; // Update cash amount
  existingBill.dueDate = dueDate; // Update due date

  // Calculate the discounted amount and due amount
  const discountedAmount = totalAmount - discount;
  const totalAmountReceived = onlineAmount + cashAmount;
  const dueAmount = discountedAmount - totalAmountReceived;

  // Update the status based on the due amount
  existingBill.status = dueAmount <= 0 ? 'paid' : 'unpaid';
  existingBill.totalAmount = totalAmount; // Update total amount
  existingBill.discountedAmount = discountedAmount; // Update discounted amount
  existingBill.dueAmount = dueAmount; // Update due amount

  // Save the updated bill
  const updatedBill = await existingBill.save();
  return updatedBill;

};

billService.DeleteBills = async (id, updateField,) => {
  return Bill.findByIdAndUpdate({ _id: id }, { ...updateField }, { new: true })
}




module.exports = billService

