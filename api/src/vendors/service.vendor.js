const Vendor = require("./model.vendor");

const vendorService = {};

vendorService.createVendor = async (vendorData) => {
  return await Vendor.create(vendorData);
};

vendorService.getAllVendor = async() => {
  return await Vendor.find({isDeleted: false})
}

// vendorService.getvendorBillById = async (id) => {
//   return await Vendor.findOne({ id });
// }

vendorService.getVendorByMobile = async (mobile) => {
  return await Vendor.findOne({ mobile });
};
vendorService.DeleteVendor = async (id, updateField,) => {
  return await Vendor.findByIdAndUpdate({ _id: id }, { ...updateField }, { new: true })
}

vendorService.editVendor = async (id, updateData) => {
      const updatedVendor = await Vendor.findByIdAndUpdate(
          {_id: id},
          {...updateData},
          { new: true, runValidators: true } // Return the updated document and run validators
      );
      return updatedVendor;
};

module.exports = vendorService;