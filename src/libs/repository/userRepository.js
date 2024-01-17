import User from "../models/userSchema";
import { signupValidate, loginValidate } from "../controllers/userController";

const createUser = async ({ data }) => {
  try {
    const user = await signupValidate(data);
    const response = await User.create(user);
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
