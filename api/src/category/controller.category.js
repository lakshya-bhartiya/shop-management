const categoryService = require("./service.category");

const categoryController = {};

categoryController.createCategory = async (req, res) => {
  const { categoryName } = req.body;

  if (!categoryName) {
    return res.send({
        status: false, msg: "categoryName is required", data: null
    })
}

  const userId = req._id;

  try {
    const exists = await categoryService.categoryExists(categoryName, userId);
        if (exists) {
          if(exists.isDeleted){
            const restoredCategory = await categoryService.editSoftDeletedCategory(exists._id, userId, {isDeleted: false})
          res.send({ status: true, msg: "Category created successfully", data: restoredCategory });
          }else{
            return res.send({ status: false, msg: "Category already exists", data: null });
          }
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
        return res.send({ msg: "categories are not found", data: null, status: false })
    }catch(err){
        console.log(err)
        return res.send({ status: false, data: [], error: err })
    }
}

categoryController.getSingleCategory = async (req, res) => {
  const userId = req._id;
  const { id } = req.params;
  try {
    const getSingleCategory = await categoryService.getSingleCategory(id, userId);

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
  const userId = req._id;
  const { id } = req.params;
  const { categoryName } = req.body;

  try {
    const category = await categoryService.getSingleCategory(id, userId);

    if (!category || category.isDeleted) {
      return res.send({ status: false, msg: "Category not found or has been deleted. Cannot edit this category.", data: null });
    }

    const updated = await categoryService.editCategory(id, userId, { categoryName });
    return res.send({ status: true, msg: "Category updated successfully", data: updated });
  } catch (err) {
    console.log(err);
    return res.send({ status: false, error: err, data: null });
  }
};


categoryController.deleteCategory = async(req,res)=>{
  const userId = req._id
  const {id} = req.params
  try{
    const deleted = await categoryService.DeleteCategory(id, userId)
    if(!deleted){
      return res.send({status: false, msg: "Category not found", data: null})
    }

    res.send({status: true, msg: "data deleted successfully", data: deleted})
  }catch(err){
    console.log(err)
    res.send({status: false, error: err, data: null})
  }
}
 
module.exports = categoryController;