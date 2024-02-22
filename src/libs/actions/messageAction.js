import {
  createNewChat,
  markMessagesAsSeen,
  getAllClickedChats,
  connectNewSocket,
} from "../api-routes/api-routes";

async function createChat(data) {
  try {
    const response = await createNewChat(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

async function markMessagesSeen(data) {
  try {
    const response = await markMessagesAsSeen(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}
async function getAllChats() {
  try {
    const response = await getAllClickedChats();
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}
async function connectSocket(){
  try{
    const response = await connectNewSocket();
    return response;
  }catch(error){
    throw Error(error.message.data)
  }
}
export { createChat, markMessagesSeen, getAllChats,connectSocket };
