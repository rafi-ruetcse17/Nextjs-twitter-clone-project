import User from "../models/userSchema";
import { signupValidate, loginValidate } from "../controllers/userController";
import { sendEmail } from "../utils/user-verification";
const createUser = async ({ data }) => {
  try {
    const user = await signupValidate(data);
    const response = await User.create(user);
    const res = await sendEmail(response.email, response.verificationToken)
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
const findUser = async (data) => {
  try {
    const user = await loginValidate(data);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const userRepository = {
  createUser,
  findUser,
};

export default userRepository;
