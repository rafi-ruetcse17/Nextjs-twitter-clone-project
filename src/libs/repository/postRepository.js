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
    const response = await Post.find({email:data}).sort({ timestamp: -1 });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deletePost = async (data)=>{
  try{
    const response = await Post.findByIdAndDelete(data)
    return response
  }catch (error) {
    throw new Error(error.message);
  }
}

const createComment = async (data) => {
  const {_id, newComment} = data;
  try {
    const post = await Post.findById(_id);

    if (!post) {
      throw new Error('Post not found');
    }
    post.comments.push(newComment);

    const updatedPost = await post.save();

    return updatedPost;
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
};

export default postRepository;
