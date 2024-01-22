import userRepository from "../repository/userRepository";

export const createUser = async (req, res) => {
  try {
    const response = await userRepository.createUser({ data: req.body });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


export const findUser = async (data) => {
  try {
    const response = await userRepository.findUser(data);
    return response
  } catch (error) {
    throw Error(error.message)
  }
};

export const updateUser = async(req, res)=>{
  try{
    const response = await userRepository.updateUser(req.body);
    return res.status(200).json(response);
  } catch(error){
    return res.status(500).json(error.message);
  }
}

export const getUser = async(req,res)=>{
  try{
    const response = await userRepository.getUser(req.body);
    return res.status(200).json(response);
  }catch(error){
    return res.status(500).json(error.message);
  }
}

export const getAllUsers = async()=>{
  try{
    const response = await userRepository.getAllUsers();
    //console.log(response);
    return response
  } catch(error){
    throw Error(error.message)
  }
}
