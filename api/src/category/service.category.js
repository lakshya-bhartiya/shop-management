const Category = require("./model.category"); // Ensure the path is correct

const categoryService = {};

// Create a new category
categoryService.createCategory = async ({ categoryName, userId }) => {
    // Check if the category already exists for the user
    const existingCategory = await Category.findOne({ categoryName, userId });

    // Create a new category if it does not exist
    const newCategory = await Category.create({ categoryName, userId });
    return newCategory;
};

// Get all categories for a user
categoryService.getAllcategory = async (userId) => {
    const getCategory = await Category.find({ userId, isDeleted: false });
    return getCategory;
};

// Check if a category exists by name
categoryService.categoryExists = async (categoryName, userId) => {
    return await Category.findOne({ categoryName, userId }); // Check by both categoryName and userId
};

// Get a single category by its ID
categoryService.getSingleCategory = async (id) => {
    const getSingleCategory = await Category.findById(id);
    return getSingleCategory;
};

categoryService.editCategory = async (id, updateData) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    {_id: id},
    {...updateData},
    { new: true, runValidators: true } // Return the updated document and run validators
);
return updatedCategory;
}


categoryService.DeleteCategory = async (id, updateField,) => {
  return Category.findByIdAndUpdate({ _id: id }, { ...updateField }, { new: true })
}

module.exports = categoryService;
