import connectDB from "@/config/connectDB";
import { verifyUser} from "@/libs/controllers/userController";

export default async function handler(req, res){
    try{
        await connectDB();
        await verifyUser(req.query.verifyId)
        res.redirect("http://localhost:3000/")
    } catch(error){
        return res.status(500).json({ error });
    }
}