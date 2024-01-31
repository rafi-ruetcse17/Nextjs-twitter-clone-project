import Chat from "../models/chatSchema";

const createConversation = async (data) => {
  const { sender_id, receiver_id } = data;
  try {
    const existingChat = await Chat.findOne({
      $or: [
        { userOne: sender_id, userTwo: receiver_id },
        { userOne: receiver_id, userTwo: sender_id },
      ],
    });

    if (existingChat) return existingChat;
    const response = await Chat.create({
      userOne: sender_id,
      userTwo: receiver_id,
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getConversation = async (_id) => {
  const {messageId} = _id;
  try {
    const response = await Chat.findOne({_id: messageId})
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};



const messageRepository = {
  createConversation,
  getConversation,
};

export default messageRepository;
