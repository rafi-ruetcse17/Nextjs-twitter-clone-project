const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  userId:{
    type: String,
  },
  name:{
    type:String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userImage:{
    type: String,
    default: '/images/blank_user.jpg'
  },
  text: {
    type: String,
  },
  image: {
    type: String,
  },
  likes: {
    type: [String],
    default: [],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const commentSchema = new mongoose.Schema({
  userId:{
    type: String,
  },
  name:{
    type:String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userImage:{
    type: String,
    default: '/images/blank_user.jpg'
  },
  text: {
    type: String,
  },
  image: {
    type: String,
  },
  likes: {
    type: [String], 
    default: [],
  },
  showModal: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  replies: [replySchema], // Array of replies
});

const postSchema = new mongoose.Schema({
  userId:{
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  name:{
    type:String,
  },
  email: {
    type: String,
    required: true,
  },
  userImage:{
    type: String,
    default: '/images/blank_user.jpg'
  },
  ReTweetedBy:{
    type: String,
  },
  text: {
    type: String,
  },
  image: {
    type: String,
  },
  likes: {
    type: [String], 
    default: [],
  },
  showUpdateModal:{
    type: Boolean,
    default:false,
  },
  showModal: {
    type: Boolean,
    default: false,
  },
  comments: [commentSchema], // Array of comments
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);

module.exports = Post;
