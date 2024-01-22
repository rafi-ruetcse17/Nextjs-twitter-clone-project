import connectDB from "@/config/connectDB";
import { createUser , getUser, getAllUsers, updateUser} from "@/libs/services/user-service";

export default async function handler(req, res){
    try{
        await connectDB();
        switch(req.method){
            case "POST":
                return await createUser(req, res)
            case "GET":
                const response =  await getAllUsers()
                return res.status(200).json(response)
            case "PATCH":
                return await updateUser(req, res);
        }
    } catch(error){
        return res.status(500).json({ error });
    }
}