import connectDB from "@/config/connectDB";
import { createReply, updateReplyLikes, updateReply} from "@/libs/services/postService";

export default async function handler(req, res) {
  const {replyId} = req.query
  try {
    await connectDB();
    switch (req.method) {
      case "PATCH":
        switch(replyId){
          case "1":
            return await createReply(req, res);
          case "2":
            return await updateReplyLikes(req, res);
          case "3":
            return await updateReply(req, res);
        }
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
