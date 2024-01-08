import connectDB from "@/config/connectDB";
import { createUser , getUser} from "@/libs/services/user-service";

export default async function handler(req, res){
    try{
        await connectDB();
        switch(req.method){
            case "POST":
                const response = await createUser(req, res)
                return response
            case "GET":
                return await getUser(req, res)
        }
    } catch(error){
        return res.status(500).json({ error });
    }
}