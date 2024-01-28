import connectDB from "@/config/connectDB";
import { createReply, updateReplyLikes,deleteReply, updateReply} from "@/libs/services/postService";

export default async function handler(req, res) {
  try {
    await connectDB();
    switch (req.method) {
      case "PATCH":
        const purpose = req.headers["x-api-purpose"];
        switch(purpose){
          case "CreateReply":
            return await createReply(req, res);
          case "LikeReply":
            return await updateReplyLikes(req, res);
          case "UpdateReply":
            return await updateReply(req, res);
        }
      case "DELETE":
        return await deleteReply(req, res);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
