import connectDB from "@/config/connectDB";
import { verifyUser } from "@/libs/services/verificationService";

export default async function handler(req, res) {
  try {
    await connectDB();
    const user = await verifyUser(req.query.verifyId);
    const token = user.verificationToken;
    res.redirect(`the-ultimate-twitter-clone.vercel.app/redirecting/${token}`);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
