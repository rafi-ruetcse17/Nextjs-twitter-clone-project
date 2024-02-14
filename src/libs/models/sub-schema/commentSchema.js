const mongoose = require("mongoose");
const replySchema = require("./replySchema")

const commentSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userImage: {
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
  showModal: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  replies: [replySchema],
});

module.exports = commentSchema;
