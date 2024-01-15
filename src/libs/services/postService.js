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

export const deletePost = async(req, res)=>{
  try{
    const response = await postRepository.deletePost(req.query._id)
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}


export const createComment = async(req, res)=>{
  try{
    const response = await postRepository.createComment(req.body)
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
export const deleteComment = async(req, res)=>{
  try{
    const response = await postRepository.deleteComment(req.query)
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const updateComment = async(req, res)=>{
  try{
    const response = await postRepository.updateComment(req.body)
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const updateCommentLikes = async(req, res)=>{
  try{
    const response = await postRepository.updateCommentLikes(req.body)
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const createReply = async(req, res)=>{
  try{
    const response = await postRepository.createReply(req.body)
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}