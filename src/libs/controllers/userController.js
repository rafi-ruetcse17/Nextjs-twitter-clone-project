const bcrypt = require("bcrypt");
const validator = require("validator");
import User from "../models/userSchema";

async function signupValidate(data) {
  const { username, email, password } = data;
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

  return { username, email, password: hash };
}

async function loginValidate(data) {
  const { email, password } = data;

  const user = await User.findOne({ email });
  //console.log("35", user);
  if (!user) {
    throw new Error("Incorrect Email..!");
  }
  
  const match = await bcrypt.compare(password, user.password);
  //console.log("36", match);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
}

module.exports = { signupValidate, loginValidate };
