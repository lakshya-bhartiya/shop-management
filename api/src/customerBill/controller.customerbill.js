const billService = require("./service.customerbill")

const billController = {}


billController.createBill = async (req, res) => {
  const { customer, products, onlineAmount, cashAmount, discount, dueDate, invoiceDate } = req.body;
  const userId = req._id; // Get the user ID from the authenticated request
  const customerName = customer.name;
  const customerMobile = customer.mobile

  try {
      const newBill = await billService.createBill({
          customer,
          customerName,
          customerMobile,
          products,
          onlineAmount,
          cashAmount,
          discount,
          dueDate,
          invoiceDate,
          userId // Include userId here
      });

      res.status(201).json({ status: true, msg: "Bill created successfully", data: newBill });
  } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, msg: "Something went wrong", error: error.message });
  }
};

billController.getBills = async (req, res) => {

  const userId = req._id
  try {
    const getAllBills = await billService.getAllBills(userId)
    return res.send({ status: true, msg: "get all bills", data: getAllBills })
  } catch (err) {
    console.log(err)
    return res.send({ status: false, msg: "something went wrong", data: null })
  }
}


billController.getBillByInvoice = async (req, res) => {
  const { invoiceNumber } = req.params
  try {
    const getBill = await billService.getBillByInvoiceNo(invoiceNumber)
    if (getBill) {
      return res.send({ status: true, msg: "data  found", data: getBill })
    } else {
      return res.send({ status: false, msg: "data not found", data: null })
    }
  } catch (error) {
    console.log(error)
    return res.send({ status: false, msg: "something went wrong", data: null })

  }

}

billController.editBill = async (req, res) => {
  const { invoiceNumber } = req.params; // Get invoice number from request parameters
  const { customer, products, discount, onlineAmount, cashAmount, dueDate } = req.body; // Get updated data from request body

  try {
      const updatedBill = await billService.editBill(invoiceNumber, { customer, products, discount, onlineAmount, cashAmount, dueDate });

      if (!updatedBill) {
          return res.send({ status: false, msg: "Bill not found" });
      }

      res.send({ status: true, msg: "Bill updated successfully", data: updatedBill });
  } catch (error) {
      console.error(error);
      res.send({ status: false, msg: "Something went wrong", error: error.message });
  }
};

billController.deleteCustomerBills = async (req, res) => {
  const { id } = req.params
  try {
    const deleteBills = await billService.DeleteBills(id, { $set: { isDeleted: true } })
    if (deleteBills === null) {
      return res.send({ status: false, msg: "data not found", data: null })
    } else {
      return res.send({ status: true, msg: "user deleted", error: null, data: deleteBills })
    }
  } catch (err) {

    console.log(err, "delete err")
    return res.send({ status: false, msg: "data not deleted", error: err })
  }
}



module.exports = billController
