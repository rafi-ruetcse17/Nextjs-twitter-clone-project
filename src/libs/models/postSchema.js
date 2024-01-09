const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
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

const Post = mongoose.models?.Post|| mongoose.model("Post", postSchema);

module.exports = Post;