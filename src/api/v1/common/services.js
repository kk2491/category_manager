"use strict";

const { Category } = require("../categories/schema/models");

const buildCategoryData = (categoryDocuments) => {
  try {
    console.log("buildCategoryData");

    const categoriesTree = buildCategoryTree(categoryDocuments, "null");

    return categoriesTree;
  } catch (err) {
    console.log("buildCategoryData error : ", err);
  }
};

const buildCategoryTree = (categoryDocuments, parentId, tree = {}) => {
  try {
    console.log("buildCategoryTree");
    for (let category of categoryDocuments) {
      if (category.parentId == parentId) {
        tree[category.name] = {
          ...category.toObject(),
          id: category._id.toString(),
          children: buildCategoryTree(categoryDocuments, category._id.toString(), {}),
        };
      }
    }

    // console.log("final tree : ", JSON.stringify(tree));
    return tree;
  } catch (err) {
    console.log("buildCategoryTree error : ", err);
  }
};

const isValidCategory = async (categoryId) => {
  try {
    let categoryData = await Category.findById(categoryId);

    if (categoryData) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("isValidCategory error : ", err);
    return false;
  }
};

const isChildPresent = async (categoryId) => {
  try {
    let childCategories = await Category.find({ parentId: categoryId });

    if (childCategories.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("isChildPresent error : ", err);
    return false;
  }
};

module.exports = {
  buildCategoryData,
  isValidCategory,
};
