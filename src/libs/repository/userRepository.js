import User from "../models/userSchema";

const createUser = async (data) => {
  try {
    const response = await User.create(data);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findOne = async (data) => {
  try {
    const response = await User.findOne(data);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUser = async (data) => {
  try {
    const user = await User.findOne(data);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (data) => {
  try {
    const user = await User.findByIdAndUpdate(data._id, data);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const userRepository = {
  createUser,
  getAllUsers,
  updateUser,
  getUser,
  getUserById,
  findOne,
};

export default userRepository;
