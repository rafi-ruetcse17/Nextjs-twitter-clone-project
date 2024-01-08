import postRepository from "../repository/postRepository";

export const createPost = async (req, res) => {
  try {
    const response = await postRepository.createPost({ data: req.body });
    return res.status(200).json(response._id);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updatePost = async (req, res) => {
  try {
    const response = await postRepository.updatePost({ data: req.body });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getPost = async (req, res) => {
  try {
    const response = await postRepository.getPost(req.query.id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getAllPosts = async(req , res) =>{
  try {
    const response = await postRepository.getAllPosts(req.query.email);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
