import { createNewUser , getExistingUser, getAllExistingUsers} from "../api-routes/user-api";
async function createUser(credentials){
    try{
        const response = await createNewUser(credentials);
        return response.data;
    } catch(error){
        throw Error(error.response.data)
    }
}
async function getUser(credentials){
    try{
        const response = await getExistingUser(credentials);
        return response.data;
    } catch(error){
        throw Error(error.response.data)
    }
}
async function getAllUsers(){
    try{
        const response = await getAllExistingUsers();
        return response.data;
    } catch(error){
        throw Error(error.response.data)
    }
}

export {createUser, getUser, getAllUsers}