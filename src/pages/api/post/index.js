import connectDB from "@/config/connectDB";
import { createPost, updatePost, getAllPosts, deletePost} from "@/libs/services/postService";

export default async function handler(req, res) {
  try {
    await connectDB();
    switch (req.method) {
      case "POST":
        return await createPost(req, res);
      case "GET":
        return await getAllPosts (req, res)
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
