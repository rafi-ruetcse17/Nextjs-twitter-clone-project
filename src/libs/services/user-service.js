import userRepository from "../repository/userRepository";
import verificationRepository from "../repository/verificationRepository";
import { sendEmail } from "../utils/user-verification";
const bcrypt = require("bcrypt");
const validator = require("validator");

export const createUser = async (req, res) => {
  try {
    const { name, username, email, password, image, cover, location } = req.body;
    if (!validator.isEmail(email)) {
      throw Error("Email not valid");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Password is not strong enough!");
    }
    if (username.includes(" ")) {
      throw Error("Username cannot contain space!");
    }

    const exists_username = await userRepository.findOne({ username });
    const exists_email = await userRepository.findOne({ email });

    if (exists_username) {
      throw Error("Username already exists!");
    }
    if (exists_email) {
      throw Error("Email already in use!");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const verificationToken = require("crypto").randomBytes(32).toString("hex");

    const data = { name, username, email, password: hash, verificationToken, image, cover, location };
    const response = await userRepository.createUser(data);
    await verificationRepository.create({
      userId: response._id,
      verificationToken,
      expireIn: new Date(Date.now() + 24 * 60 * 60 * 1000)
    })

    await sendEmail(response.email, response.verificationToken);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const loginUser = async (data) => {
  try {
    const { email, password, verificationToken } = data;
    if (verificationToken) {
      const user_by_token = await userRepository.findOne({ verificationToken });
      if (!user_by_token) throw new Error("Cannot find user");
      return user_by_token;
    }

    const user = await userRepository.findOne({ email });
    if (!user) {
      throw new Error("Incorrect Email..!");
    }
    if (!user.isVerified) {
      throw new Error("Check email & verify account!");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Incorrect password");
    }
    return user;
  } catch (error) {
    throw Error(error.message);
  }
};

export const loginWithSNS = async ({ name, email, image }) => {
  try {
    const username = email.split("@")[0];
    const user = await userRepository.findOne({ email });
    if (!user) {
      let res;
      if (name && image)
        res = await userRepository.create({ username, name, email, image });
      else if (name)
        res = await userRepository.create({ username, name, email });
      else res = await userRepository.create({ username, email });
      return res;
    }
    return user;
  } catch (error) {
    throw Error(error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const response = await userRepository.updateUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getUser = async ({ username }) => {
  try {
    const response = await userRepository.getUser({ username });
    return response;
  } catch (error) {
    return error.message;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await userRepository.getAllUsers();
    return response;
  } catch (error) {
    throw Error(error.message);
  }
};

export const getUserById = async (id) => {
  try {
    const response = await userRepository.getUserById(id);
    return response;
  } catch (error) {
    throw Error(error.message);
  }
};
