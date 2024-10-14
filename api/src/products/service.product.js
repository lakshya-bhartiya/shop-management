// service.product.js
const Product = require("./model.product");

const productService = {};

// Create a new product with category association
productService.createProduct = async (productData) => {
  const { name, sellingPrice, productCode, userId, categoryId } = productData;

  console.log(categoryId, "id")
  return await Product.create({ name, sellingPrice, productCode, userId, categoryId });
};

// Get all products for a specific user, including category information
productService.getAllProducts = async (userId) => {
  return await Product.find({ userId, isDeleted: false }).populate("categoryId"); // Populate category details in the response
};

productService.editProduct = async (id, updateData) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    { ...updateData },
    { new: true, runValidators: true }
  );
  return updatedProduct;
};


productService.productExists = async (name, userId) => {
    return await Product.findOne({ name, userId }); // Check by both ProductName and userId
};

// Get a single Product by its ID
productService.getSingleProduct = async (id) => {
    const getSingleProduct = await Product.findById(id);
    return getSingleProduct;
};



productService.DeleteProduct = async (id, updateField,) => {
    return Product.findByIdAndUpdate({ _id: id }, { ...updateField }, { new: true })
  }


module.exports = productService;
