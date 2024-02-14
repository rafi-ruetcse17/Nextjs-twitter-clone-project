const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
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
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = replySchema;