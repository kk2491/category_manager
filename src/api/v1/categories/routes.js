"use strict";

const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.getAllCategories);
router.post("/", controller.createCategory);
router.patch("/:categoryId", controller.updateCategory);
router.delete("/:categoryId", controller.deleteCategory);

module.exports = router;
