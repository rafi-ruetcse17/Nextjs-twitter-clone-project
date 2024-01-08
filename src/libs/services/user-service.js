import userRepository from "../repository/userRepository";

export const createUser = async (req, res) => {
  try {
    const response = await userRepository.createUser({ data: req.body });
    return res.status(200).json(response);
  } catch (error) {
    //console.log(error.message);
    return res.status(500).json(error.message);
  }
};


export const findUser = async (data) => {
  try {
    const response = await userRepository.findUser(data);
    return response
    //console.log("dd", response);
    //return res.status(200).json(response);
  } catch (error) {
    throw Error(error)
    //console.log("dd1", error);
    //return res.status(500).json(error.message);
  }
};
