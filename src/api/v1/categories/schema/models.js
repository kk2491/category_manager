"use strict";

const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    parentId: {
      type: String,
    },
    createdTimestamp: {
      type: Date,
    },
    lastUpdatedTimestamp: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: "createdTimestamp",
      updatedAt: "lastUpdatedTimestamp",
    },
  }
);

const Category = mongoose.model("Categories", CategorySchema, "Categories");
module.exports = { Category };
