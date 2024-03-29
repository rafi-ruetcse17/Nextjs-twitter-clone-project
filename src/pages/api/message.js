import connectDB from "@/config/connectDB";
import { createChat, getAllChats } from "@/libs/services/messageService";

export default async function handler(req, res) {
  try {
    await connectDB();
    switch (req.method) {
      case "POST":
        return await createChat(req, res);
      case "GET":
        return await getAllChats(req, res);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
