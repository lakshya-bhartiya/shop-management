const Bill = require("./model.customerbill");

const billService = {};

// Create a new bill
billService.createBill = async ({
  invoiceNumber,
  invoiceDate,
  customerId,
  products,
  totalAmount,
  discountAmount,
  discountedAmount,
  onlineAmount,
  cashAmount,
  dueAmount,
  dueDate,
  status,
  userId,
}) => {
  const newBill = await Bill.create({
    invoiceNumber,
    invoiceDate,
    customerId,
    products,
    totalAmount,
    discountAmount,
    discountedAmount,
    onlineAmount,
    cashAmount,
    dueAmount,
    dueDate,
    status,
    userId,
  });
  return newBill;
};

// Get a single bill by ID
billService.getSingleBill = async (billId, userId) => {
  const bill = await Bill.findOne({ _id: billId, userId, isDeleted: false })
    .populate("customerId")
    .populate("products.productId");
  return bill;
};

// Get all bills
billService.getAllBills = async (userId) => {
  return await Bill.find({ userId, isDeleted: false })
    .populate("customerId")
    .populate("products.productId");
};

// Update a bill by ID
billService.updateBill = async (id, userId, updateData) => {
  const updatedBill = await Bill.findByIdAndUpdate(
    { _id: id, userId, isDeleted: false },
    { ...updateData },
    { new: true, runValidators: true }
  );
  return updatedBill;
};

// Delete (soft delete) a bill by ID
billService.deleteBill = async (billId, userId) => {
  const bill = await Bill.findByIdAndUpdate(
    { _id: billId, userId, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
  return bill;
};


module.exports = billService;
