const mongoose = require("mongoose");
const commentSchema = require("./sub-schema/commentSchema")

const postSchema = new mongoose.Schema({
  userId:{
    type: String,
  },
  postId:{
    type:String,
  },
  username: {
    type: String,
    required: true,
  },
  name:{
    type:String,
  },
  email: {
    type: String,
    required: true,
  },
  userImage:{
    type: String,
  },
  ReTweetedBy:{
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
  showUpdateModal:{
    type: Boolean,
    default:false,
  },
  showModal: {
    type: Boolean,
    default: false,
  },
  comments: [commentSchema],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);

module.exports = Post;
