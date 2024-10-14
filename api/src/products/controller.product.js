// controller.product.js
const productService = require("./service.product");

const productController = {};

// Create a new product
productController.createProduct = async (req, res) => {
    const { name, sellingPrice, productCode, categoryId } = req.body;
    const userId = req._id; // Assuming this is extracted from a JWT or session

    try {
        const exists = await productService.productExists(name, userId);
        console.log(exists, "exist")
        if (exists) {
            return res.send({
                status: false,
                msg: "product with this  productName already exists",
                data: null
            });
        }
        const newProduct = await productService.createProduct({ name, sellingPrice, productCode, userId, categoryId });
        res.send({ status: true, msg: "Product created successfully", data: newProduct });
    } catch (error) {
        console.error(error);
        res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
};

// Get all products for a user
productController.getProducts = async (req, res) => {
    const userId = req._id;
    try {
        const products = await productService.getAllProducts(userId);
        if (products.length) {
            return res.send({ status: true, msg: "all product data getted", data: products })
        }
        return res.send({ msg: "notes are not found", data: null, status: false })
    } catch (error) {
        console.error(error);
        res.send({ status: false, msg: "Something went wrong", error: error.message });
    }
};

productController.getSingleProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const getSingleProduct = await productService.getSingleProduct(id);

        if (!getSingleProduct || getSingleProduct.isDeleted) {
            return res.send({ msg: "Product not found or has been deleted", data: null, status: false });
        }

        return res.send({ status: true, msg: "product data retrieved", data: getSingleProduct });
    } catch (err) {
        console.log(err);
        return res.send({ status: false, data: [], error: err });
    }
};


productController.editProduct = async (req, res) => {
    const { id } = req.params; // Get Product ID from request parameters
    const { name, sellingPrice, productCode, categoryId } = req.body; // Include categoryId in update data

    try {
        const updatedProduct = await productService.editProduct(id, { name, sellingPrice, productCode, categoryId });

        if (!updatedProduct) {
            res.send({ status: "ERR", msg: "Product not found" });
        }


        if (!updatedProduct || updatedProduct.isDeleted) {
            return res.send({ status: false, msg: "Category not found or has been deleted. Cannot edit this category.", data: null });
        }

        res.send({ status: "OK", msg: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        console.error(error);
        res.send({ status: "ERR", msg: "Something went wrong", error: error.message });
    }
};


productController.deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        const deleted = await productService.DeleteProduct(id, { $set: { isDeleted: true } })

        res.send({ status: true, msg: "data deleted successfully", data: deleted })
    } catch (err) {
        console.log(err)
        res.send({ status: false, error: err, data: null })
    }
}

module.exports = productController;
