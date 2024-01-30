import messageRepository from "../repository/messageRepository";

export const createConversation = async (req, res) => {
  try {
    const response = await messageRepository.createConversation(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};