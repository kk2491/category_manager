"use strict";

const commonServices = require("../common/services");
const { Category } = require("./schema/models");

const getAllCategoriesService = async () => {
  try {
    console.log("getAllCategoriesService");

    let categoryDocuments = await Category.find();
    console.log("categoryDocuments : ", categoryDocuments);

    let categoryTree = commonServices.buildCategoryData(categoryDocuments);

    if (categoryTree) {
      return {
        code: 200,
        msg: categoryTree,
      };
    } else {
      return {
        code: 500,
        msg: "Internal error message",
      };
    }
  } catch (err) {
    console.log("getAllCategoriesService error : ", err);
  }
};

const createCategoryService = async (categoryInput) => {
  try {
    console.log("createCategoryService");

    let categoryObj = new Category({
      name: categoryInput.name,
      parentId: categoryInput.parentId,
    });

    let newCategory = await categoryObj.save();
    console.log("newCategory : ", newCategory.toObject());

    return {
      code: 200,
      msg: { ...newCategory.toObject(), id: newCategory._id.toString() },
    };
  } catch (err) {
    console.log("createCategoryService error : ", err);
    return {
      code: 200,
      msg: "Internal error message",
    };
  }
};

const updateCategoryService = async (categoryId, categoryUpdate) => {
  try {
    console.log("updateCategoryService");
    let updatedCategory = await Category.findByIdAndUpdate(categoryId, categoryUpdate, { new: true });

    return {
      code: 200,
      msg: { ...updatedCategory.toObject(), id: updatedCategory._id.toString() },
    };
  } catch (err) {
    console.log("updateCategoryService error : ", err);
    return {
      code: 200,
      msg: "Internal error message",
    };
  }
};

const deleteCategoryService = async (categoryId) => {
  try {
    console.log("deleteCategoryService");

    let deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (deletedCategory) {
      return {
        code: 200,
        msg: categoryId + " is deleted",
      };
    } else {
      return {
        code: 200,
        msg: "Internal error message",
      };
    }
  } catch (err) {
    console.log("deleteCategoryService error : ", err);
    return {
      code: 200,
      msg: "Internal error message",
    };
  }
};

module.exports = {
  getAllCategoriesService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
};
