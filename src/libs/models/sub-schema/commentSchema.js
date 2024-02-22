const mongoose = require("mongoose");
const replySchema = require("./replySchema");

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    likes: {
      type: [String],
      default: [],
    },
    replies: [replySchema],
  },
  { timestamps: true }
);

module.exports = commentSchema;
