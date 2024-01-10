const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId:{
    type:String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
  showModal:{
    type: Boolean,
    default:false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.models?.Comment|| mongoose.model("Comment", commentSchema);

module.exports = Comment;
