const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mediaSchema = Schema(
  {
    owner: {
      ref: "User",
      // required: true,
      type: Schema.Types.ObjectId,
    },
    url: { type: String, unique: false, default: "" },
    caption: { type: String, unique: false, default: "" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    reactions: [{ type: Schema.Types.ObjectId, ref: "Reaction" }],
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  },
  {
    timestamps: true,
  },
);

const Media = mongoose.model("Media", mediaSchema);
module.exports = Media;