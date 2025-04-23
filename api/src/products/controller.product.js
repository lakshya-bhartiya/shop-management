// controller.product.js
const productService = require("./service.product");

const productController = {};

// Create a new product
productController.createProduct = async (req, res) => {
  const { name, price, stock, categoryId, vendorId } = req.body;
  const userId = req._id; // Assuming this is extracted from a JWT or session

  try {
    const exists = await productService.productExists(name, userId);
    if (exists) {
        if (exists.isDeleted) {
            const restoredProduct = await productService.editSoftDeletedProduct(exists._id, userId, {price, stock, isDeleted: false });
            return res.send({ status: true, msg: "Product created successfully", data: restoredProduct });
        } else {
            return res.send({ status: false, msg: "Product already exists", data: null });
        }
    }
    const newProduct = await productService.createProduct({
      name,
      price,
      stock,
      userId,
      categoryId,
      vendorId
    });
    res.send({
      status: true,
      msg: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.send({
      status: false,
      msg: "Something went wrong",
      error: error.message,
    });
  }
};

// Get all products for a user
productController.getProducts = async (req, res) => {
  const userId = req._id;
  try {
    const products = await productService.getAllProducts(userId);
    if (products.length) {
      return res.send({
        status: true,
        msg: "all product data getted",
        data: products,
      });
    }
    return res.send({
      msg: "products are not found",
      data: null,
      status: false,
    });
  } catch (error) {
    console.error(error);
    res.send({
      status: false,
      msg: "Something went wrong",
      error: error.message,
    });
  }
};

productController.getSingleProduct = async (req, res) => {
  const userId = req._id; // Assuming this is extracted from a JWT or session
  const { id } = req.params;
  try {
    const getSingleProduct = await productService.getSingleProduct(id, userId);

    if (!getSingleProduct || getSingleProduct.isDeleted) {
      return res.send({
        msg: "Product not found or has been deleted",
        data: null,
        status: false,
      });
    }

    return res.send({
      status: true,
      msg: "product data retrieved",
      data: getSingleProduct,
    });
  } catch (err) {
    console.log(err);
    return res.send({ status: false, data: [], error: err });
  }
};

productController.editProduct = async (req, res) => {
  const userId = req._id; // Assuming this is extracted from a JWT or session
  const { id } = req.params; // Get Product ID from request parameters
  const { name, price, stock, categoryId, vendorId } = req.body; // Include categoryId in update data

  try {
    const updatedProduct = await productService.editProduct(id, userId, {
      name,
      price,
      stock,
      categoryId,
        vendorId,
    });

    if (!updatedProduct || updatedProduct.isDeleted) {
      return res.send({
        status: false,
        msg: "product not found or has been deleted. Cannot edit this category.",
        data: null,
      });
    }

    res.send({
      status: "OK",
      msg: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.send({
      status: "ERR",
      msg: "Something went wrong",
      error: error.message,
    });
  }
};

productController.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req._id; // Assuming this is extracted from a JWT or session
  try {
    const deleted = await productService.DeleteProduct(id, userId);
    if (!deleted) {
      return res.send({ status: false, msg: "Product not found" });
    }

    res.send({ status: true, msg: "data deleted successfully", data: deleted });
  } catch (err) {
    console.log(err);
    res.send({ status: false, error: err, data: null });
  }
};

productController.countProducts = async (req, res) => {
  const userId = req._id; // Assuming this is extracted from a JWT or session
  try {
    const count = await productService.countProducts(userId);
    res.send({ status: true, msg: "Product count retrieved", data: count });
  } catch (error) {
    console.error(error);
    res.send({
      status: false,
      msg: "Something went wrong",
      error: error.message,
    });
  }
}

productController.updateStock = async (req, res) => {
    const userId = req._id;
    const { id } = req.params; // product ID
    const { quantity, action } = req.body; // action: 'add' or 'remove'
  
    try {
      const product = await productService.getSingleProduct( id, userId );
  
      if (!product) {
        return res.send({ status: false, msg: "Product not found" });
      }
  
      let updatedStock = product.stock;
  
      if (action === "add") {
        updatedStock += quantity;
      } else if (action === "remove") {
        if (quantity > updatedStock) {
          return res.send({ status: false, msg: "Not enough stock" });
        }
        updatedStock -= quantity;
      } else {
        return res.send({ status: false, msg: "Invalid action" });
      }
  
      const updatedProduct = await productService.editProduct(id, userId, { stock: updatedStock });
  
      res.send({ status: true, msg: "Stock updated", data: updatedProduct });
    } catch (err) {
      console.error(err);
      res.send({ status: false, msg: "Something went wrong", error: err.message });
    }
  };
  

module.exports = productController;
