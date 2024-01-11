import connectDB from "@/config/connectDB";
import { createComment, deleteComment} from "@/libs/services/postService";

export default async function handler(req, res) {
  try {
    await connectDB();
    switch (req.method) {
      case "POST":
        return await createComment(req, res);
      case "DELETE":
        return await deleteComment(req,res);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
