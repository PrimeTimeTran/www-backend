const Media = require("../models/Media.model");

const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");

const mediaController = {};

mediaController.create = catchAsync(async (req, res, next) => {
  console.log('Hi');
  console.log('Hi', req.file);

  return sendResponse(
    res,
    201,
    true,
    { foo: 'bar', spam: 'ham' },
    null,
    "Media created.",
  );
})

mediaController.list = catchAsync(async (req, res, next) => {
  const medias = Media.find({})

  return sendResponse(
    res,
    201,
    true,
    medias,
    null,
    "Medias",
  );
})


module.exports = mediaController;