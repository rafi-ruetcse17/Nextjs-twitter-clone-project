const bcrypt = require("bcrypt");
const validator = require("validator");
import User from "../models/userSchema";
import connectDB from "@/config/connectDB";

async function signupValidate(data) {
  const { name, username, email, password } = data;
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough!");
  }
  const exists_username = await User.findOne({ username });
  const exists_email = await User.findOne({ email });

  if (exists_username) {
    throw Error("Username already exists!");
  }
  if (exists_email) {
    throw Error("Email already in use!");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const verificationToken = require('crypto').randomBytes(32).toString('hex');

  return { name, username, email, password: hash ,verificationToken};
}

async function loginValidate(data) {
  const { email, password , verificationToken} = data;
  //console.log();
  if(verificationToken){
    const user_by_token = await User.findOne({verificationToken});
    if(!user_by_token)
      throw new Error("Cannot find user");
    return user_by_token;
  }
  
  const user = await User.findOne({ email });
  //console.log("35", user);
  if (!user) {
    throw new Error("Incorrect Email..!");
  }
  if(!user.isVerified){
    throw new Error("Check email & verify account!");
  }
  
  const match = await bcrypt.compare(password, user.password);
  //const another_check = user.password===password
  //console.log("36", match);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
}

async function findOne ({name, email, image}){
  const username = email.split('@')[0];
  await connectDB();
  const user = await User.findOne({email})
  if (!user) {
    let res;
    if(name && image)
      res = await User.create({username, name, email, image});
    else if(name)
      res = await User.create({username, name, email});
    else 
      res = await User.create({username, email});
    return res;
  }
  return user;
  
}

async function verifyUser(verificationToken){
  const user_check = await User.findOne({verificationToken})
  if(!user_check)
    throw Error("user not found")
  const user = await User.findByIdAndUpdate(user_check._id, {isVerified: true})
  return user;
}

module.exports = { signupValidate, loginValidate ,findOne,verifyUser};
