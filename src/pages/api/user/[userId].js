import connectDB from "@/config/connectDB";
import { updateUser } from "@/libs/services/user-service";

export default async function handler(req, res) {
  try {
    await connectDB();
    switch (req.method) {
      case "PATCH":
        return await updateUser(req, res);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
