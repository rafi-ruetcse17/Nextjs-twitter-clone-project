const mongoose = require("mongoose");
const messageSchema = require("./sub-schema/messageSchema");

const chatSchema = new mongoose.Schema(
  {
    userOne: {
      type: String,
      required: true,
    },
    userTwo: {
      type: String,
      required: true,
    },
    messages: [messageSchema],
  },
  { timestamps: true }
);

const Chat = mongoose.models?.Chat || mongoose.model("Chat", chatSchema);
module.exports = Chat;
