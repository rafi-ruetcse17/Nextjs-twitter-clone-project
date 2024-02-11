import { createNewConversation, markMessagesAsSeen } from "../api-routes/user-api";

async function createConversation(data) {
  try {
    const response = await createNewConversation(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

async function markMessagesSeen(data){
  try {
    const response = await markMessagesAsSeen(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

export{
    createConversation,
    markMessagesSeen,
}