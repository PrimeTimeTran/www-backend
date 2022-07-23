const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const mediaSchema = Schema(
  {
    owner: {
      ref: "User",
      required: true,
      type: Schema.Types.ObjectId,
    },
    caption: { type: String, unique: false, default: "" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    reactions: [{ type: Schema.Types.ObjectId, ref: "Reaction" }],
  },
  {
    timestamps: true,
  },
);

const Media = mongoose.model("Media", mediaSchema);
module.exports = Media;