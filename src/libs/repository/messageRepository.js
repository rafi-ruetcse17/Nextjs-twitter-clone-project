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
  const { conversationId, senderIds } = data;
  console.log(data);
  try {
    const response = await Chat.findOneAndUpdate(
      {
        _id: conversationId,
        "conversation.sender_id": { $in: senderIds },
      },
      { $set: { "conversation.$.seen": true } },
      { new: true }
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getConversation = async (_id) => {
  const { messageId } = _id;
  try {
    const response = await Chat.findOne({ _id: messageId });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const messageRepository = {
  createConversation,
  getConversation,
  markMessagesSeen,
};

export default messageRepository;
