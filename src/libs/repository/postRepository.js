import Post from "../models/postSchema";

const createPost = async ({ data }) => {
  try {
    const response = await Post.create(data);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
const updatePost = async ({ data }) => {
  try {
    const response = await Post.findByIdAndUpdate(data._id, data);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getPost = async (data) => {
  try {
    const response = await Post.findById(data);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getAllPosts = async (data) => {
  try {
    const response = await Post.find().sort({ timestamp: -1 });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deletePost = async (data) => {
  try {
    const response = await Post.findByIdAndDelete(data);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createComment = async (data) => {
  const { _id, newComment } = data;
  try {
    const post = await Post.findById(_id);

    if (!post) {
      throw new Error("Post not found");
    }
    post.comments.push(newComment);

    const updatedPost = await post.save();

    return updatedPost;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteComment = async ({ postId, commentId }) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { comments: { _id: commentId } },
      },
      { new: true }
    );

    if (!updatedPost) {
      throw new Error("Post not found");
    }

    return updatedPost;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateComment = async ({_id, commentId, updateData}) => {
  try {
    const { text, image } = updateData;

    const updateFields = {};
    if (text !== undefined) {
      updateFields["comments.$.text"] = text;
    }
    if (image !== undefined) {
      updateFields["comments.$.image"] = image;
    }

    const updatedPost = await Post.findOneAndUpdate(
      { _id, "comments._id": commentId },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedPost) {
      throw new Error("Post not found or comment not updated");
    }

    const updatedComment = updatedPost.comments.find((comment) =>
      comment._id.equals(commentId)
    );

    return updatedComment;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCommentLikes = async ({ postId, commentId, likesArray }) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $set: { "comments.$[comment].likes": likesArray },
      },
      {
        arrayFilters: [{ "comment._id": commentId }],
        new: true,
      }
    );

    if (!updatedPost) {
      throw new Error("Post not found");
    }

    return updatedPost;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createReply = async ({ _id, commentId, newReply }) => {
  console.log(_id, commentId, newReply);
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      {
        $push: { "comments.$[comment].replies": newReply },
      },
      {
        arrayFilters: [{ "comment._id": commentId }],
        new: true,
      }
    );

    if (!updatedPost) {
      throw new Error("Post not found");
    }

    return updatedPost;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateReplyLikes = async ({postId, commentId, replyId, likesArray}) => {
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId, "comments._id": commentId, "comments.replies._id": replyId },
      { $set: { "comments.$[comment].replies.$[reply].likes": likesArray } },
      {
        arrayFilters: [{ "comment._id": commentId }, { "reply._id": replyId }],
        new: true,
      }
    );

    if (!updatedPost) {
      throw new Error("Post not found or reply not updated");
    }

    const updatedComment = updatedPost.comments.find(comment => comment._id.equals(commentId));
    const updatedReply = updatedComment.replies.find(reply => reply._id.equals(replyId));

    return updatedReply;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteReply = async ({postId, commentId, replyId}) => {
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { "_id": postId, "comments._id": commentId },
      { $pull: { "comments.$.replies": { _id: replyId } } },
      { new: true }
    );

    if (!updatedPost) {
      throw new Error("Post not found or reply not deleted");
    }

    const updatedComment = updatedPost.comments.find(comment => comment._id.equals(commentId));

    return updatedComment.replies;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateReply = async ({ postId ,commentId, replyId, updateData }) => {
  try {
    const { text, image } = updateData;

    const updateFields = {};
    if (text !== undefined) {
      updateFields["comments.$[comment].replies.$[reply].text"] = text;
    }
    if (image !== undefined) {
      updateFields["comments.$[comment].replies.$[reply].image"] = image;
    }

    const updatedPost = await Post.findOneAndUpdate(
      { "_id":postId, "comments._id": commentId, "comments.replies._id": replyId },
      { $set: updateFields },
      {
        arrayFilters: [
          { "comment._id": commentId },
          { "reply._id": replyId },
        ],
        new: true,
      }
    );

    if (!updatedPost) {
      throw new Error("Post not found or reply not updated");
    }

    const updatedComment = updatedPost.comments.find((comment) =>
      comment._id.equals(commentId)
    );
    const updatedReply = updatedComment.replies.find((reply) =>
      reply._id.equals(replyId)
    );

    return updatedReply;
  } catch (error) {
    throw new Error(error.message);
  }
};


const postRepository = {
  createPost,
  updatePost,
  getPost,
  getAllPosts,
  deletePost,
  createComment,
  deleteComment,
  updateComment,
  updateCommentLikes,
  createReply,
  updateReplyLikes,
  deleteReply,
  updateReply,
};

export default postRepository;
