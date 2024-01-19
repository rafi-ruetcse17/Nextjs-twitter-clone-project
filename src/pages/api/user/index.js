import connectDB from "@/config/connectDB";
import { createUser , getUser, getAllUsers} from "@/libs/services/user-service";

export default async function handler(req, res){
    try{
        await connectDB();
        switch(req.method){
            case "POST":
                const response = await createUser(req, res)
                return response
            case "GET":
                return await getAllUsers()
        }
    } catch(error){
        return res.status(500).json({ error });
    }
}