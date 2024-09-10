const customerService = require("./service.customer");

const customerController = {};

customerController.createCustomer = async (req, res) => {
  try {
    const newCustomer = await customerService.createCustomer(req.body);
    res.status(201).json({ status: "OK", msg: "Customer created successfully", data: newCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "ERR", msg: "Something went wrong", error: error.message });
  }
};

// customerController.getCustomerBill = async (req, res) => {
//   const { id } = req.params; // Get customer ID from route parameters
//   console.log(id, "sdfghj")
//   try {
//       const bills = await customerService.getCustomerBillById({id});
//       console.log(bills, "bills")
//       if (!bills) {
//           return res.status(404).json({ status: "ERR", msg: "No bills found for this customer." });
//       }
//       res.status(200).json({ status: "OK", data: bills });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ status: "ERR", msg: "Something went wrong", error: error.message });
//   }
// }

customerController.getCustomers = async (req, res) => {
  try{
    const getAllCustomers = await customerService.getAllCustomer()
    res.send({status: "ok", data: getAllCustomers})
  }catch(err){
    console.log(err)
  }
}

customerController.deleteCustomer = async (req, res) => {
  const { id } = req.params
  try {
    const deleteCustomer = await customerService.DeleteCustomer(id, { $set: { isDeleted: true } })
    if (deleteCustomer === null) {
      return res.send({ status: "err", msg: "data not found", data: null })
    } else {
      return res.send({ status: "ok", msg: "user deleted", error: null, data: deleteBills })
    }
  } catch (err) {

    console.log(err, "delete err")
    return res.send({ status: "err", msg: "data not deleted", error: err })
  }
}

module.exports = customerController;