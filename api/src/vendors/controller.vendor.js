const vendorService = require("./service.vendor");

const vendorController = {};

vendorController.createvendor = async (req, res) => {
  try {
    const newvendor = await vendorService.createVendor(req.body);
    res.send({ status: true, msg: "vendor created successfully", data: newvendor });
  } catch (error) {
    console.error(error);
    res.send({ status: false, msg: "Something went wrong", error: error.message });
  }
};

// vendorController.getvendorBill = async (req, res) => {
//   const { id } = req.params; // Get vendor ID from route parameters
//   console.log(id, "sdfghj")
//   try {
//       const bills = await vendorService.getvendorBillById({id});
//       console.log(bills, "bills")
//       if (!bills) {
//           return res.status(404).json({ status: "ERR", msg: "No bills found for this vendor." });
//       }
//       res.status(200).json({ status: "OK", data: bills });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ status: "ERR", msg: "Something went wrong", error: error.message });
//   }
// }

vendorController.getvendors = async (req, res) => {
  try{
    const getAllvendors = await vendorService.getAllVendor()
    res.send({status: true, data: getAllvendors})
  }catch(err){
    console.log(err)
  }
}

vendorController.deletevendor = async (req, res) => {
  const { id } = req.params
  try {
    const deletevendor = await vendorService.DeleteVendor(id, { $set: { isDeleted: true } })
    console.log(deletevendor)
    if (deletevendor === null) {
      return res.send({ status: "err", msg: "data not found", data: null })
    } else {
      return res.send({ status: "ok", msg: "user deleted", error: null, data: deletevendor })
    }
  } catch (err) {

    console.log(err, "delete err")
    return res.send({ status: "err", msg: "data not deleted", error: err })
  }
}

vendorController.editvendor = async (req, res) => {
  const { id } = req.params; // Get vendor ID from request parameters
  const { name, address, mobile } = req.body; // Get updated data from request body

  try {
      const updatedvendor = await vendorService.editVendor(id, { name, address, mobile });

      if (!updatedvendor) {
          res.send({ status: "ERR", msg: "vendor not found" });
      }

      res.send({ status: "OK", msg: "vendor updated successfully", data: updatedvendor });
  } catch (error) {
      console.error(error);
      res.send({ status: "ERR", msg: "Something went wrong", error: error.message });
  }
};

module.exports = vendorController;