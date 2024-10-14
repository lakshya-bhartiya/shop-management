const categoryService = require("./service.category");

const categoryController = {};

categoryController.createCategory = async (req, res) => {
  // Correct the typo in the variable name
  const { categoryName } = req.body;

  if (!categoryName) {
    return res.send({
        status: false, msg: "categoryName is required", data: null
    })
}

  const userId = req._id;

  try {

    console.log(categoryName)

    const exists = await categoryService.categoryExists(categoryName, userId);
        console.log(exists,"exist")
        if (exists) {
            return res.send({
                status: false,
                msg: "Category with this  categoryName already exists",
                data: null
            });
        }
    const newCategory = await categoryService.createCategory({categoryName, userId});
    return res.send({ status: true, msg: "Category created successfully", data: newCategory });
  } catch (error) {
    console.log(error);
    return res.send({ status: false, msg: "Error creating category", error });
  }
};

categoryController.getAllCategory = async (req, res) => {
    const userId = req._id
    try{
        const getAllCategory = await categoryService.getAllcategory(userId)

        if (getAllCategory.length) {
            return res.send({ status: true, msg:"all category data getted",data:getAllCategory })
        }
        return res.send({ msg: "notes are not found", data: null, status: false })
    }catch(err){
        console.log(err)
        return res.send({ status: false, data: [], error: err })
    }
}

categoryController.getSingleCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const getSingleCategory = await categoryService.getSingleCategory(id);

    if (!getSingleCategory || getSingleCategory.isDeleted) {
      return res.send({ msg: "Category not found or has been deleted", data: null, status: false });
    }

    return res.send({ status: true, msg: "Category data retrieved", data: getSingleCategory });
  } catch (err) {
    console.log(err);
    return res.send({ status: false, data: [], error: err });
  }
};


categoryController.editCategory = async (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;

  try {
    // Retrieve the category to check if it's marked as deleted
    const category = await categoryService.getSingleCategory(id);

    // Check if the category exists and if it is marked as deleted
    if (!category || category.isDeleted) {
      return res.send({ status: false, msg: "Category not found or has been deleted. Cannot edit this category.", data: null });
    }

    // Proceed with the update if the category is not deleted
    const updated = await categoryService.editCategory(id, { categoryName });
    return res.send({ status: true, msg: "Category updated successfully", data: updated });
  } catch (err) {
    console.log(err);
    return res.send({ status: false, error: err, data: null });
  }
};


categoryController.deleteCategory = async(req,res)=>{
  const {id} = req.params
  try{
    const deleted = await categoryService.DeleteCategory(id, { $set: { isDeleted: true }})

    res.send({status: true, msg: "data deleted successfully", data: deleted})
  }catch(err){
    console.log(err)
    res.send({status: false, error: err, data: null})
  }
}
 
module.exports = categoryController;