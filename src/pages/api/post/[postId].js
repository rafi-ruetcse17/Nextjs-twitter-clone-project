import connectDB from "@/config/connectDB";
import { getPost} from "@/libs/services/postService";

export default async function handler(req, res) {
  try {
    await connectDB();
    switch (req.method) {
      case "GET":
        return await getPost(req, res);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
