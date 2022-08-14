const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require("dotenv").config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Mongoose connected to ${MONGODB_URI}`);
  })
  .catch((e) => {
    console.log({ e });
  });

const indexRouter = require("./api/index");

app.use("/api", indexRouter);

app.use("/foo", (req, res, next) => {
  res.send({ foo: "bar" });
});

const utilsHelper = require("./helpers/utils.helper");

app.use((err, req, res, next) => {
  console.log("ERROR", err);
  if (err.isOperational) {
    return utilsHelper.sendResponse(
      res,
      err.statusCode ? err.statusCode : 500,
      false,
      null,
      { message: err.message },
      err.errorType,
    );
  } else {
    return utilsHelper.sendResponse(
      res,
      err.statusCode ? err.statusCode : 500,
      false,
      null,
      { message: err.message },
      "Internal Server Error",
    );
  }
});

module.exports = app;
