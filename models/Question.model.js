const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = Schema(
  {
    answers: Map,
    body: { type: String, unique: false, default: "" },
    answer: { type: String, unique: false, default: "a" },
    owner: {
      ref: "User",
      // required: true,
      type: Schema.Types.ObjectId,
    },
    media: {
      ref: "Media",
      // required: true,
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
);

const Media = mongoose.model("Media", questionSchema)
module.exports = Media;