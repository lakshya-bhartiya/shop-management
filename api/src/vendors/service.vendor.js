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
vendorService.getVendorByMobile = async (mobile, userId) => {
    return await Vendor.findOne({ mobile, userId, isDeleted: false });
};

// Get a single vendor by ID
vendorService.getSingleVendor = async (id, userId) => {
    return await Vendor.findOne({_id: id, userId, isDeleted: false});
};

// Soft delete a vendor (mark as deleted)
vendorService.deleteVendor = async (id, userId) => {
    return await Vendor.findByIdAndUpdate({_id: id, userId, isDeleted: false }, { isDeleted: true }, { new: true });
};

// Edit vendor details
vendorService.editVendor = async (id, userId, updateData) => {
    return await Vendor.findByIdAndUpdate(
        {_id: id, userId, isDeleted: false },
        { ...updateData },
        { new: true, runValidators: true } // Return the updated document and run validators
    );
};

// Get vendor count
vendorService.countVendors = async (userId) => {
    return await Vendor.countDocuments({ userId, isDeleted: false });
};

vendorService.editSoftDeletedVendor = async (id, userId, updateData) => {
    return await Vendor.findByIdAndUpdate(
        {_id: id, userId, isDeleted: true },
        { ...updateData },
        { new: true, runValidators: true } // Return the updated document and run validators
    );
};


module.exports = vendorService;
