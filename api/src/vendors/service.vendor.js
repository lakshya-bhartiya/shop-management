const Vendor = require("./vendor.model");

const vendorService = {};

// Create a new vendor
vendorService.createVendor = async ({ userId, name, address, mobile }) => {
    return await Vendor.create({ userId, name, address, mobile });
};

// Get all vendors for a specific user
vendorService.getAllVendors = async (userId) => {
    return await Vendor.find({ userId, isDeleted: false });
};

// Get a vendor by mobile number
vendorService.getVendorByMobile = async (mobile) => {
    return await Vendor.findOne({ mobile });
};

// Get a single vendor by ID
vendorService.getSingleVendor = async (id) => {
    return await Vendor.findById(id);
};

// Soft delete a vendor (mark as deleted)
vendorService.deleteVendor = async (id) => {
    return await Vendor.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

// Edit vendor details
vendorService.editVendor = async (id, updateData) => {
    return await Vendor.findByIdAndUpdate(
        id,
        { ...updateData },
        { new: true, runValidators: true } // Return the updated document and run validators
    );
};

// Get vendor count
vendorService.countVendors = async (userId) => {
    return await Vendor.countDocuments({ userId, isDeleted: false });
};

module.exports = vendorService;
