const Media = require("../models/Media.model");

const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");

const { uploadFile, unlinkFile } = require("../helpers/s3.helper");

const mediaController = {};

mediaController.getAll = catchAsync(async (req, res) => {
  console.log('hi There')
  const media = await Media.where({})

  console.log({ media });

  return sendResponse(
    res,
    200,
    true,
    { foo: 'bar', media },
    null,
    "Media"
  )
})

mediaController.create = catchAsync(async (req, res, next) => {
  const file = req.file
  const result = await uploadFile(file)
  const media = Media.create({ url: result.Location })
  await unlinkFile(file.path)
  return sendResponse(
    res,
    201,
    true,
    { media },
    null,
    "Media created.",
  );
})

module.exports = mediaController;