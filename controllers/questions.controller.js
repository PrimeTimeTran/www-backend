const Question = require("../models/Question.model");

const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");


const questionController = {};

questionController.list = catchAsync(async (req, res, next) => {

  return sendResponse(
    res,
    201,
    true,
    { media },
    null,
    "Media created.",
  );
})


module.exports = questionController