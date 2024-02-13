import connectDB from "@/config/connectDB";
import {deleteReply} from "@/libs/services/postService";

export default async function handler(req, res) {
  try {
    await connectDB();
    switch (req.method) {
      case "PATCH":
        return await deleteReply(req, res);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
