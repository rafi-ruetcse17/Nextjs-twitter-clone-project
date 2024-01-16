import connectDB from "@/config/connectDB";
import { createComment,updateComment, deleteComment, updateCommentLikes} from "@/libs/services/postService";

export default async function handler(req, res) {
  try {
    await connectDB();
    switch (req.method) {
      case "POST":
        return await createComment(req, res);
      case "DELETE":
        return await deleteComment(req,res);
      case "PATCH":
        const purpose = req.headers["x-api-purpose"];
        switch(purpose){
          case "LikeComment":
            return await updateCommentLikes(req, res);
          case "UpdateComment":
            return await updateComment(req, res);
        }
        
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
