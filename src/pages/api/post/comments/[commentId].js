import connectDB from "@/config/connectDB";
import { updateCommentLikes, updateComment } from "@/libs/services/postService";

export default async function handler(req, res) {
  const {commentId} = req.query;
  try {
    await connectDB();
    switch (req.method) {
      case "PATCH":
        switch(commentId){
          case '1':
            return await updateCommentLikes(req, res);
          case '2':
            return await updateComment(req, res);
        }
        
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
