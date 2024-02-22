import messageRepository from "../repository/messageRepository";

export const createChat = async (req, res) => {
  try {
    const response = await messageRepository.createChat(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const markMessagesSeen = async (data) => {
  try {
    const response = await messageRepository.markMessagesSeen(data);
    return response
  } catch (error) {
    return error.message
  }
};

export const getChat = async (_id) => {
  try {
    const response = await messageRepository.getChat(_id);
    return response;
  } catch (error) {
    return error.message;
  }
};

export const getAllChats = async (req, res) => {
  try {
    const response = await messageRepository.getAllChats();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const sendMessage = async({query, update})=>{
  try {
    const response = await messageRepository.findOneAndUpdate({query, update});
    return response;
  } catch (error) {
    return error.message
  }  
}


