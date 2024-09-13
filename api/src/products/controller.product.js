const productService = require("./service.product");

const productController = {};

// Create a new product
productController.createProduct = async (req, res) => {
    const {name,sellingPrice, productCode} = req.body
    const userId = req._id


    try {
        const newProduct = await productService.createProduct({name, sellingPrice, productCode, userId});
        res.send({ status: true, msg: "Product created successfully", data: newProduct });
    } catch (error) {
        console.error(error);
        res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
};

// Get all products
productController.getProducts = async (req, res) => {
    const userId = req._id
    try {
        const products = await productService.getAllProducts(userId);
        res.send({ status: true, data: products });
    } catch (error) {
        console.error(error);
        res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
};

productController.editProduct = async (req, res) => {
    const { id } = req.params; // Get Product ID from request parameters
    const { name, sellingPrice, productCode } = req.body; // Get updated data from request body
  
    try {
        const updatedProduct = await productService.editProduct(id, { name, sellingPrice, productCode });
  
        if (!updatedProduct) {
            res.send({ status: "ERR", msg: "Product not found" });
        }
  
        res.send({ status: "OK", msg: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        console.error(error);
        res.send({ status: "ERR", msg: "Something went wrong", error: error.message });
    }
  };

module.exports = productController;