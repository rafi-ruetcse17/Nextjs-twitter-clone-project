import connectDB from "@/config/connectDB";
import { verifyUser} from "@/libs/controllers/userController";

export default async function handler(req, res){
    try{
        await connectDB();
        const user = await verifyUser(req.query.verifyId)
        const token = user.verificationToken;
        res.redirect(`http://localhost:3000/redirecting/${token}`)
    } catch(error){
        return res.status(500).json({ error });
    }
}