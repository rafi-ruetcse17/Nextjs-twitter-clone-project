import verificationRepository from "../repository/verificationRepository";
import userRepository from "../repository/userRepository";

export const verifyUser = async (verificationToken) => {
    const token_check = await verificationRepository.findOne({ verificationToken });
  
    if (!token_check) throw Error("user not found");
    
    const expireDate = new Date(token_check.expireIn)
    if(new Date()>=expireDate){
        await userRepository.findByIdAndDelete(token_check.userId)
        throw Error("Verification token expired. Signup again!");
    }

    const data = {_id:token_check.userId, isVerified: true};
    const user = await userRepository.updateUser(data);
    return user;
};