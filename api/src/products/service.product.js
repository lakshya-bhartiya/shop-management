const Product = require("./model.product");

const productService = {};

// Create a new product
productService.createProduct = async (productData) => {
    const {name, sellingPrice, productCode, userId} = productData
    return await Product.create({name, sellingPrice,productCode, userId});
};

// Get all products
productService.getAllProducts = async (userId) => {
    return await Product.find({userId});
};

productService.editProduct = async (id, updateData) => {
    const updatedProduct = await Product.findByIdAndUpdate(
        {_id: id},
        {...updateData},
        { new: true, runValidators: true } // Return the updated document and run validators
    );
    return updatedProduct;
};




module.exports = productService;