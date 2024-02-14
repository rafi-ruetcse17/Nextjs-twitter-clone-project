import Verification from "../models/verificationSchema";

const create = async (data) => {
  try {
    const response = await Verification.create(data);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findOne = async (data) => {
  try {
    const response = await Verification.findOne(data);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const verificationRepository = {
  create,
  findOne,
};

export default verificationRepository;
