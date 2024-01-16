import {
  createNewPost,
  updatePrevPost,
  getPrevPost,
  getAllPrevPosts,
  deleteClickedPost,
  createNewComment,
  deleteClickedComment,
  likeClickedComment,
  createNewReply,
  updateClickedComment,
  likeClickedReply,
  deleteClickedReply,
} from "../api-routes/user-api";

async function createPost(data) {
  try {
    const response = await createNewPost(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}
async function updatePost(data) {
  try {
    const response = await updatePrevPost(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}
async function getPost(data) {
  try {
    const response = await getPrevPost(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

async function getAllPosts(data) {
  try {
    const response = await getAllPrevPosts(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

async function deletePost(data) {
  try {
    const response = await deleteClickedPost(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}
async function createComment(data) {
  try {
    const response = await createNewComment(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

async function deleteComment(data) {
  try {
    const response = await deleteClickedComment(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}
async function updateComment(data) {
  try {
    const response = await updateClickedComment(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

async function updateCommentLikes(data) {
  try {
    const response = await likeClickedComment(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

async function createReply(data) {
  try {
    const response = await createNewReply(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}
async function updateReplyLikes(data){
  try {
    const response = await likeClickedReply(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

async function deleteReply(data){
  try {
    const response = await deleteClickedReply(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}


export {
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
};
