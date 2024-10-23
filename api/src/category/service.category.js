const Category = require("./model.category");

const categoryService = {};

categoryService.createCategory = async ({ categoryName, userId }) => {
    const existingCategory = await Category.findOne({ categoryName, userId });

    const newCategory = await Category.create({ categoryName, userId });
    return newCategory;
};


categoryService.getAllcategory = async (userId) => {
    const getCategory = await Category.find({ userId, isDeleted: false });
    return getCategory;
};

categoryService.categoryExists = async (categoryName, userId) => {
    return await Category.findOne({ categoryName, userId });
};

categoryService.getSingleCategory = async (id) => {
    const getSingleCategory = await Category.findById(id);
    return getSingleCategory;
};

categoryService.editCategory = async (id, updateData) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    {_id: id},
    {...updateData},
    { new: true, runValidators: true }
);
return updatedCategory;
}


categoryService.DeleteCategory = async (id, updateField,) => {
  return Category.findByIdAndUpdate({ _id: id }, { ...updateField }, { new: true })
}

module.exports = categoryService;
