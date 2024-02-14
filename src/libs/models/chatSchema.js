const mongoose = require("mongoose");
const conversationSchema = require("./sub-schema/conversationSchema")

const chatSchema = new mongoose.Schema({
  userOne: {
    type: String,
    required: true,
  },
  userTwo: {
    type: String,
    required: true,
  },
  conversation: [conversationSchema],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.models?.Chat || mongoose.model("Chat", chatSchema);
module.exports = Chat;
