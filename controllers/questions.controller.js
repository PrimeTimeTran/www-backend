const Question = require("../models/Question.model");

const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");


const { uploadFile } = require("../helpers/s3.helper");

const questionController = {};

questionController.create = catchAsync(async (req, res, next) => {
  
  return sendResponse(
    res,
    201,
    true,
    { media },
    null,
    "Media created.",
  );
})


module.exports = questionController;