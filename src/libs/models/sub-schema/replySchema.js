const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

module.exports = replySchema;
