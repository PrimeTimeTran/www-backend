const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false, unique: false },
    avatarUrl: { type: String, required: false, default: "" },
    googleId: { type: String, required: false, default: "" },
    facebookId: { type: String, required: false, default: "" },
    username: { type: String, required: false, unique: false, default: "" },
    lastName: { type: String, required: false, unique: false, default: "" },
    firstName: { type: String, required: false, unique: false, default: "" },
    intro: { type: String, required: false, unique: false, default: "" },
    occupations: [],
    currentLocation: {
      default: "",
      type: Object,
      unique: false,
      required: false,
    },

    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    reactions: [{ type: Schema.Types.ObjectId, ref: "Reaction" }],

    // These are not yet complete...
    friendships: [],
    posts: [],
    comments: [],
    reactions: [],
    conversations: [],
    messages: [],
    hobbies: [],
  },
  {
    timestamps: true,
  },
);

userSchema.statics.findByEmail = function findByEmail(email) {
  return this.findOne({ email });
};

userSchema.statics.findByUsername = function findByUsername(username) {
  return this.findOne({ username });
};

userSchema.statics.findOrCreate = function findOrCreate(profile, cb) {
  var userObj = new this();
  this.findOne({ email: profile.email }, async function (err, result) {
    if (!result) {
      let newPassword =
        profile.password || "" + Math.floor(Math.random() * 100000000);
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(newPassword, salt);

      userObj.name = profile.name;
      userObj.email = profile.email;
      userObj.password = newPassword;
      userObj.googleId = profile.googleId;
      userObj.facebookId = profile.facebookId;
      userObj.avatarUrl = profile.avatarUrl;
      userObj.save(cb);
    } else {
      cb(err, result);
    }
  });
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  // delete obj._id;
  delete obj.__v;
  delete obj.googleId;
  delete obj.password;
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.facebookId;
  return obj;
};

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password, function (_, isMatch) {
    return isMatch;
  });
};

userSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "365d",
  });
  return accessToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;