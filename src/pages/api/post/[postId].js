import connectDB from "@/config/connectDB";
import { getPost, updatePost,deletePost } from "@/libs/services/postService";

export default async function handler(req, res) {
  try {
    await connectDB();
    switch (req.method) {
      case "PATCH":
        return await updatePost(req, res);
      case "GET":
        return await getPost(req, res);
      case "DELETE":
        return await deletePost(req, res);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
