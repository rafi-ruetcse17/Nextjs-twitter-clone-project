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

const markMessagesSeen = async (data) => {
  const { conversationId, messageIds } = data;

  try {
    const response = await Chat.updateOne(
      { _id: conversationId, "conversation._id": { $in: messageIds } },
      { $set: { "conversation.$[elem].seen": true } },
      { arrayFilters: [{ "elem._id": { $in: messageIds } }] }
    );

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getConversation = async (_id) => {
  const { messageId } = _id;
  try {
    return await Chat.findOne({ _id: messageId });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllConversations = async () => {
  try {
    return await Chat.find();
  } catch (error) {
    throw new Error(error.message);
  }
};


const messageRepository = {
  createConversation,
  getConversation,
  markMessagesSeen,
  getAllConversations,
};

export default messageRepository;
