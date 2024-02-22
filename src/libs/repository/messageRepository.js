import Chat from "../models/chatSchema";

const createChat = async (data) => {
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
  const { chatId, messageIds } = data;

  try {
    const response = await Chat.updateOne(
      { _id: chatId, "messages._id": { $in: messageIds } },
      { $set: { "messages.$[elem].seen": true } },
      { arrayFilters: [{ "elem._id": { $in: messageIds } }] }
    );

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
const findOneAndUpdate = async ({ query, update }) => {
  try {
    return await Chat.findOneAndUpdate(query, update, {
      upsert: true,
      new: true,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getChat = async (_id) => {
  const { messageId } = _id;
  try {
    return await Chat.findOne({ _id: messageId });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllChats = async () => {
  try {
    return await Chat.find();
  } catch (error) {
    throw new Error(error.message);
  }
};

const messageRepository = {
  createChat,
  getChat,
  markMessagesSeen,
  getAllChats,
  findOneAndUpdate,
};

export default messageRepository;
