import connectDB from "@/config/connectDB";
import { createReply} from "@/libs/services/postService";

export default async function handler(req, res) {
  try {
    await connectDB();
    switch (req.method) {
      case "PATCH":
        return await createReply(req, res);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
