"use strict";

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = 13000;
const mongoUri = process.env.MONGOURI;

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const apiv1Routes = require("./src/api/v1/routes");

app.use("/v1", apiv1Routes);

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("successfully connected to mongodb");
  })
  .catch((err) => {
    console.log("connection error : ", err);
  });

app.listen(13000, () => {
  console.log("listening on port ", port);
});
