import { createNewConversation } from "../api-routes/user-api";

async function createConversation(data) {
  try {
    const response = await createNewConversation(data);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

export{
    createConversation,
}