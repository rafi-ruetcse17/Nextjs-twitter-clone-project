import {
  createNewPost,
  updatePrevPost,
  getPrevPost,
  getAllPrevPosts,
  deleteClickedPost,
  createNewComment,
  deleteClickedComment,
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

async function getAllPosts(data){
  try{
    const response = await getAllPrevPosts(data)
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

async function deletePost(data){
  try{
    const response = await deleteClickedPost(data)
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}
async function createComment(data){
  try {
    const response = await createNewComment(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

async function deleteComment(data){
  try {
    const response = await deleteClickedComment(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}


export { createPost, updatePost, getPost ,getAllPosts, deletePost,createComment, deleteComment};
