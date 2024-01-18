const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  name:{
    type:String,
    default: "New User",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  image: {
    type:String,
    default: "/images/blank_user.jpg",
  },
  following:{
    type:[String],
  },
  followers:{
    type:[String],
  },
  verificationToken:{
    type:String,
  },
  isVerified:{
    type:Boolean,
    default:false,
  }
}, {timestamps: true});

const User = mongoose.models?.User|| mongoose.model('User', userSchema)
module.exports = User;