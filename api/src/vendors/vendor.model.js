const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    address : {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Vendor", vendorSchema);