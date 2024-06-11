"use strict";

const commonServices = require("../common/services");
const { Category } = require("./schema/models");

const getAllCategoriesService = async () => {
  try {
    console.log("getAllCategoriesService");

    let categoryDocuments = await Category.find();
    // console.log("categoryDocuments : ", categoryDocuments);

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

const deleteCategoryServiceDepr = async (categoryId) => {
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
    console.log("deleteCategoryServiceDepr error : ", err);
    return {
      code: 200,
      msg: "Internal error message",
    };
  }
};

const performRecursiveDeletion = async function (parentCategoryId) {
  try {
    // let deletedDocuments = await Category.deleteMany({ parentId: parentCategoryId });
    let childDocuments = await Category.find({ parentId: parentCategoryId });
    console.log("childDocuments : ", childDocuments);
    await Category.deleteMany({ parentId: parentCategoryId });

    for (let i = 0; i < childDocuments.length; i++) {
      performRecursiveDeletion(childDocuments[i]._id.toString());
    }

    return;
  } catch (err) {
    console.log("performRecursiveDeletion error : ", err);
  }
};

const deleteCategoryService = async (categoryId) => {
  try {
    console.log("deleteCategoryService");
    let deletedCategory = await Category.findByIdAndDelete(categoryId);
    let deletedStatus = await performRecursiveDeletion(categoryId);

    if (true) {
      return {
        code: 200,
        msg: "delete is successful",
      };
    } else {
      return {
        code: 200,
        msg: "delete is unsuccessful",
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
