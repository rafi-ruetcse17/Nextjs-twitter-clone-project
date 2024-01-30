import connectDB from "@/config/connectDB";
import { createConversation } from "@/libs/services/messageService";

export default async function handler(req, res) {
  try {
    await connectDB();
    switch (req.method) {
      case "POST":
        return await createConversation(req, res);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
