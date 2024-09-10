const Bill = require("./model.customerbill");
const Customer = require("../customer/model.customer")

const InvoiceCounter = require("../../helper/model.invoiceConter")

const billService = {}

billService.createBill = async (invoiceData) => {
  const { customer, customerName, products, onlineAmount, cashAmount, discount, dueDate, invoiceDate } = invoiceData;

  let invoiceCounter = await InvoiceCounter.findOneAndUpdate(
    {},
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true }
  );

  const invoiceNumber = "INV" + invoiceCounter.sequenceValue;

  // Check if the customer already exists
  let existingCustomer = await Customer.findOne({ mobile: customer.mobile });

  // If the customer doesn't exist, create a new customer
  if (!existingCustomer) {
    existingCustomer = await Customer.create(customer);
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
  });

  return newBill;
};


billService.getAllBills = async () => {
  let bills = await Bill.find({})
  return bills
}

billService.getBillByInvoiceNo = async (invoiceNumber) => {
  const billByInvoice = await Bill.findOne({ invoiceNumber })
  return billByInvoice
}

// billService.editBill = async (invoiceNumber, { customer, products, discount, onlineAmount, cashAmount, invoiceDate, dueDate }) => {
//   const updatedBill = await Bill.findOneAndUpdate({ invoiceNumber }, { customer, products, discount, onlineAmount, cashAmount, invoiceDate, dueDate })
//   return updatedBill
// }

billService.DeleteBills = async (id, updateField,) => {
  return Bill.findByIdAndUpdate({ _id: id }, { ...updateField }, { new: true })
}




module.exports = billService