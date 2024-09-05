const Bill = require("./model.customerbill");
const Customer = require("../customer/model.customer")

const InvoiceCounter = require("../../helper/model.invoiceConter")

const billService = {}

billService.createBill = async (invoiceData) => {
  const { customer, products, paymentMethod, amountReceived} = invoiceData;

  let invoiceCounter = await InvoiceCounter.findOneAndUpdate(
    {},
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true }
);

const invoiceNumber = invoiceCounter.sequenceValue;

  // Check if the customer already exists
  let existingCustomer = await Customer.findOne({ mobile: customer.mobile });
  
  // If the customer doesn't exist, create a new customer
  if (!existingCustomer) {
    existingCustomer = await Customer.create(customer);
  }

  // Calculate total amount and due amount
  const totalAmount = products.reduce((total, product) => total + (product.price * product.quantity), 0);
  const dueAmount = totalAmount - amountReceived;

  const status = amountReceived >= totalAmount ? 'paid' : 'unpaid';

  // Create the bill
  const newBill = await Bill.create({
    invoiceNumber,
    customer: existingCustomer._id, // Use the customer ID
    products,
    totalAmount,
    paymentMethod,
    amountReceived,
    dueAmount,
    status,
  });

  return newBill;
};

billService.getAllBills = async () => {
  let bills = await Bill.find({})
  return bills
}

billService.DeleteBills = async (id, updateField,) => {
  return Bill.findByIdAndUpdate({ _id: id }, { ...updateField }, { new: true })
}


module.exports = billService