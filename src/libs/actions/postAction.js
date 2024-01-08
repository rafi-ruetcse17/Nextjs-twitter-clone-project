import {
  createNewPost,
  updatePrevPost,
  getPrevPost,
  getAllPrevPosts
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
    const response = await getPrevPost(data.response);
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

export { createPost, updatePost, getPost ,getAllPosts};
