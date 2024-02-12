import messageRepository from "../repository/messageRepository";

export const createConversation = async (req, res) => {
  try {
    const response = await messageRepository.createConversation(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const markMessagesSeen = async (req, res) => {
  try {
    const response = await messageRepository.markMessagesSeen(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getConversation = async (_id) => {
  try {
    const response = await messageRepository.getConversation(_id);
    return response;
  } catch (error) {
    return error.message;
  }
};

export const getAllConversations = async (req, res) => {
  try {
    const response = await messageRepository.getAllConversations();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};



