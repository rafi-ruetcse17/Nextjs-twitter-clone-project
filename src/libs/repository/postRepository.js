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
const getPost = async (data ) => {
  try {
    const response = await Post.findById(data)
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getAllPosts = async (data ) => {
  try {
    const response = await Post.find({data}).sort({ timestamp: -1 });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const postRepository = {
  createPost,
  updatePost,
  getPost,
  getAllPosts
};

export default postRepository;
