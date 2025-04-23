// service.product.js
const Product = require("./model.product");

const productService = {};

// Create a new product with category association
productService.createProduct = async ({
  name,
  price,
  stock,
  userId,
  categoryId,
  vendorId
}) => {
  return await Product.create({ name, price, stock, userId, categoryId, vendorId });
};

// Get all products for a specific user, including category information
productService.getAllProducts = async (userId) => {
  return await Product.find({ userId, isDeleted: false }).populate(
    "categoryId", "vendorId"
  );
};

productService.getSingleProduct = async (id, userId) => {
  const getSingleProduct = await Product.findOne({
    _id: id,
    userId,
    isDeleted: false,
  }).populate("categoryId");
  return getSingleProduct;
};

productService.editProduct = async (id, userId, updateData) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id, userId, isDeleted: false },
    { ...updateData },
    { new: true, runValidators: true }
  );
  return updatedProduct;
};

productService.productExists = async (name, userId) => {
  return await Product.findOne({ name, userId }); // Check by both ProductName and userId
};


productService.DeleteProduct = async (id, userId) => {
  return Product.findByIdAndUpdate(
    { _id: id, userId, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
};

productService.countProducts = async (userId) => {
  return await Product.countDocuments({userId, isDeleted: false})
}

productService.editSoftDeletedProduct = async (id, userId, updateData) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id, userId, isDeleted: true }, // ensure it belongs to user and is soft-deleted
    { ...updateData },
    { new: true, runValidators: true }
  );
  return updatedProduct;
}

module.exports = productService;
