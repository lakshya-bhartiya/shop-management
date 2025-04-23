const Category = require("./model.category");

const categoryService = {};

categoryService.createCategory = async ({ categoryName, userId }) => {
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

categoryService.getSingleCategory = async (id, userId) => {
    const getSingleCategory = await Category.findOne({_id: id, userId, isDeleted: false });
    return getSingleCategory;
};

categoryService.editCategory = async (id, userId, updateData) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    {_id: id, userId, isDeleted: false},
    {...updateData},
    { new: true, runValidators: true }
);
return updatedCategory;
}


categoryService.editSoftDeletedCategory = async (id, userId, updateData) => {
    const updatedCategory = await Category.findByIdAndUpdate(
        { _id: id, userId, isDeleted: true }, // ensure it belongs to user and is soft-deleted
        { ...updateData },
        { new: true, runValidators: true }
    );
    return updatedCategory;
}


categoryService.DeleteCategory = async (id, userId) => {
  return Category.findByIdAndUpdate({ _id: id, userId, isDeleted: false }, {isDeleted: true}, { new: true })
}

module.exports = categoryService;
