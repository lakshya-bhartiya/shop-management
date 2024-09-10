const billService = require("./service.customerbill")

const billController = {}


billController.createBill = async (req, res) => {

  const { customer, products, onlineAmount, cashAmount, discount, dueDate, invoiceDate } = req.body;

  const customerName = customer.name

  try {
    const newBill = await billService.createBill({
      customer,
      customerName,
      products,
      onlineAmount,
      cashAmount,
      discount,
      dueDate,
      invoiceDate,
    });

    res.status(201).json({ status: "OK", msg: "Bill created successfully", data: newBill });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "ERR", msg: "Something went wrong", error: error.message });
  }
};

billController.getBills = async (req, res) => {

  const { invoiceNumber, customer, amount, status } = req.query
  try {
    const getAllBills = await billService.getAllBills({ invoiceNumber, customer, amount, status })
    return res.send({ status: "OK", msg: "get all bills", data: getAllBills })
  } catch (err) {
    console.log(err)
    return res.send({ status: "ERR", msg: "something went wrong", data: null })
  }
}


billController.getBillByInvoice = async (req, res) => {
  const { invoiceNumber } = req.params
  try {
    const getBill = await billService.getBillByInvoiceNo(invoiceNumber)
    if (getBill) {
      return res.send({ status: "ok", msg: "data  found", data: getBill })
    } else {
      return res.send({ status: "err", msg: "data not found", data: null })
    }
  } catch (error) {
    console.log(error)
    return res.send({ status: "err", msg: "something went wrong", data: null })

  }

}

// billController.editBill = async (req, res) => {
//   const { invoiceNumber } = req.params
//   const { customer, products, discount, onlineAmount, cashAmount, invoiceDate, dueDate } = req.body
//   try {
//     const UpdatedBill = await billService.editBill(invoiceNumber, { customer, products, discount, onlineAmount, cashAmount, invoiceDate, dueDate })
//     if (UpdatedBill) {
//       return res.send({ status: "ok", msg: "bill updated successfully", data: UpdatedBill })
//     } else {
//       return res.send({ status: "err", msg: "data not found", data: null })
//     }
//   } catch (error) {
//     console.log(error)
//     return res.send({ status: "err", msg: "something went wrong", data: null })
//   }
// }

billController.deleteCustomerBills = async (req, res) => {
  const { id } = req.params
  try {
    const deleteBills = await billService.DeleteBills(id, { $set: { isDeleted: true } })
    if (deleteBills === null) {
      return res.send({ status: "err", msg: "data not found", data: null })
    } else {
      return res.send({ status: "ok", msg: "user deleted", error: null, data: deleteBills })
    }
  } catch (err) {

    console.log(err, "delete err")
    return res.send({ status: "err", msg: "data not deleted", error: err })
  }
}



module.exports = billController