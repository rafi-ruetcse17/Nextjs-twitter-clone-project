const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  sender_id:{
    type: String,
    // required: true,
  },
  receiver_id:{
    type: String,
    // required: true,
  },
  message:{
    type:String,
    // required: true,
  }
});

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
