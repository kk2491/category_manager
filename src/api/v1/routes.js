"use strict";

const express = require("express");
const router = express.Router();

router.use("/categories", require("./categories/routes"));

module.exports = router;
