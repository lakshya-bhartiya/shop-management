const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },
    productCode : {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
});

module.exports = mongoose.model("Product", productSchema);