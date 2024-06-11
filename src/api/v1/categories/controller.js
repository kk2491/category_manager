"use strict";

const services = require("./services");
const comServices = require("../common/services");

const getAllCategories = async (req, res) => {
  try {
    console.log("getAllCategories");

    // input validation if any query parameters are present in the URL

    let categoriesResponse = await services.getAllCategoriesService();

    res.status(categoriesResponse.code).json(categoriesResponse.msg);
    return;
  } catch (err) {
    console.log("getAllCategories error : ", err);
    res.status(500).json("Internal error");
    return;
  }
};

const createCategory = async (req, res) => {
  try {
    console.log("createCategory");

    // run input validation

    console.log("request body : ", req.body);
    let createCategoryResponse = await services.createCategoryService(req.body);

    res.status(createCategoryResponse.code).json(createCategoryResponse.msg);
    return;
  } catch (err) {
    console.log("createCategory error : ", err);
    res.status(500).json("Internal error");
  }
};

const updateCategory = async (req, res) => {
  try {
    console.log("updateCategory");

    // run input validation
    if (!(await comServices.isValidCategory(req.params.categoryId))) {
      res.status(404).json("category not found");
      return;
    }

    let updateCategoryResponse = await services.updateCategoryService(req.params.categoryId, req.body);

    res.status(updateCategoryResponse.code).json(updateCategoryResponse.msg);
    return;
  } catch (err) {
    console.log("updateCategory error : ", err);
    res.status(500).json("Internal error");
  }
};

// TODO(Kishor): May need a force delete
const deleteCategory = async (req, res) => {
  try {
    console.log("deleteCategory");

    // run input validation
    if (!(await comServices.isValidCategory(req.params.categoryId))) {
      res.status(404).json("category not found");
      return;
    }

    let deleteCategoryResponse = await services.deleteCategoryService(req.params.categoryId);

    res.status(deleteCategoryResponse.code).json(deleteCategoryResponse.msg);
    return;
  } catch (err) {
    console.log("deleteCategory error : ", err);
    res.status(500).json("Internal error");
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
