import connectDB from "@/config/connectDB";
import { createPost , updatePost, getPost, getAllPosts} from "@/libs/services/postService";

export default async function handler(req, res) {
  try {
    await connectDB();
    switch (req.method) {
      case "POST":
        const response = await createPost(req, res);
        return response;
      case "PATCH":
        return await updatePost(req, res);
      case "GET":
        // return await getPost(req, res);
        return await getAllPosts (req, res)
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
