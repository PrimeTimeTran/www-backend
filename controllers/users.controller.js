const bcrypt = require("bcryptjs");

const User = require("../models/User.model");

const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");

const userController = {};

userController.create = catchAsync(async (req, res, next) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });

  if (user)
    return next(new AppError(409, "User already exists", "Register Error"));

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  user = await User.create({
    email,
    password,
  });
  const accessToken = await user.generateToken();
  return sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Used created.",
  );
});

userController.read = catchAsync(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    res.status(404).json({ message: "User not Found" });
  } else {
    sendResponse(res, 201, true, user);
  }
});

userController.list = catchAsync(async (req, res) => {
  const users = await User.findOne({});
  if (!users) {
    res.status(404).json({ message: "Users not Found" });
  } else {
    res.json(users);
  }
});

userController.update = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true },
    (err, user) => {
      console.log({ err, user });
      if (!user) {
        res.status(404).json({ message: "User not Found" });
      } else {
        res.json(user);
      }
    },
  );
});

userController.destroy = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.id, (err, user) => {
    if (!user) {
      res.status(404).json({ message: "User not Found" });
    } else {
      res.json(user);
    }
  });
});

module.exports = userController;