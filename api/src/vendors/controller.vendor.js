const vendorService = require("./service.vendor");

const vendorController = {};

// Create a new vendor
vendorController.createVendor = async (req, res) => {
    const { name, address, mobile } = req.body;
    const userId = req._id;

    const existingVendor = await vendorService.getVendorByMobile(mobile, userId);

    if (existingVendor) {
        if (existingVendor.isDeleted) {
            const restoredVendor = await vendorService.editSoftDeletedVendor(existingVendor._id, userId, { name, address, mobile, isDeleted: false });
            return res.send({ status: true, msg: "Vendor created successfully", data: restoredVendor });
        } else {
            return res.send({ status: false, msg: "Vendor already exists", data: null });
        }
    }

    try {
        const newVendor = await vendorService.createVendor({ userId, name, address, mobile });
        res.send({ status: true, msg: "Vendor created successfully", data: newVendor });
    } catch (error) {
        console.error(error);
        res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
};

// Get all vendors
vendorController.getVendors = async (req, res) => {
    const userId = req._id;
    try {
        const allVendors = await vendorService.getAllVendors(userId);
        res.send({ status: true, data: allVendors });
    } catch (err) {
        console.error(err);
        res.send({ status: false, msg: "Something went wrong", data: null });
    }
};

// Get a single vendor
vendorController.getSingleVendor = async (req, res) => {
    const userId = req._id;
    const { id } = req.params;
    try {
        const singleVendor = await vendorService.getSingleVendor(id, userId);

        if (!singleVendor || singleVendor.isDeleted) {
            return res.send({ msg: "Vendor not found or has been deleted", data: null, status: false });
        }

        return res.send({ status: true, msg: "Vendor data retrieved", data: singleVendor });
    } catch (err) {
        console.log(err);
        return res.send({ status: false, data: [], error: err });
    }
};

// Soft delete a vendor
vendorController.deleteVendor = async (req, res) => {
    const userId = req._id;
    const { id } = req.params;
    try {
        const deletedVendor = await vendorService.deleteVendor(id, userId);
        if (!deletedVendor) {
            return res.send({ status: false, msg: "Vendor not found" });
        }
        res.send({ status: true, msg: "Vendor deleted successfully", data: deletedVendor });
    } catch (err) {
        console.error(err);
        res.send({ status: false, msg: "Something went wrong", error: err.message });
    }
};

// Edit vendor details
vendorController.editVendor = async (req, res) => {
    const userId = req._id; // Assuming this is extracted from a JWT or session
    const { id } = req.params; // Get vendor ID from request parameters
    const { name, address, mobile } = req.body; // Get updated data from request body

    try {
        const updatedVendor = await vendorService.editVendor(id, userId, { name, address, mobile });

        if (!updatedVendor) {
            return res.send({ status: false, msg: "Vendor not found" });
        }

        res.send({ status: true, msg: "Vendor updated successfully", data: updatedVendor });
    } catch (error) {
        console.error(error);
        res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
};

// Get total vendor count
vendorController.getVendorCount = async (req, res) => {
    const userId = req._id;
    try {
        const vendorCount = await vendorService.countVendors(userId);
        res.send({ status: true, msg: "Vendor count retrieved successfully", data: { count: vendorCount } });
    } catch (err) {
        console.error(err);
        res.send({ status: false, msg: "Something went wrong", data: null });
    }
};

module.exports = vendorController;
