import connectDB from "@/config/connectDB";
import { createConversation ,getAllConversations,markMessagesSeen} from "@/libs/services/messageService";

export default async function handler(req, res) {
  try {
    await connectDB();
    switch (req.method) {
      case "POST":
        return await createConversation(req, res);
      case "GET":
        return await getAllConversations(req, res)
      case 'PATCH':
        return await markMessagesSeen(req, res);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
