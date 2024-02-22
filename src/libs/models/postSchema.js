const mongoose = require("mongoose");
const commentSchema = require("./sub-schema/commentSchema");

const postSchema = new mongoose.Schema(
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
    isRetweetd: {
      type: Boolean,
      default: false,
    },
    retweetedPostId: {
      type: String,
    },
    retweetedBy: {
      type: String,
    },
    likes: {
      type: [String],
      default: [],
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);

module.exports = Post;
