import axios from "axios";

const user_endpoint = '/api/user';
const post_endpoint = '/api/post';
const comment_endpoint = '/api/post/comments'
const reply_endpoint = '/api/post/reply'
const message_endpoint = '/api/message'
const image_upload_endpoint = '/api/upload'
const socket_endpoint = 'api/socket'
const API = axios.create({ baseURL: "the-ultimate-twitter-clone.vercel.app" })

API.interceptors.request.use((req)=>{
    if(req.url.includes(socket_endpoint))
        return req;
    if(!req.url.includes(comment_endpoint) &&
    !req.url.includes(image_upload_endpoint))
        req.headers["Content-Type"] = "application/json";
    if(req.url.includes(image_upload_endpoint))
        req.headers["Content-Type"] = "multipart/form-data";
    return req;
})

API.interceptors.response.use((res) => {
    return res
});

export const createNewUser = (payload) =>API.post(user_endpoint, payload);
export const getExistingUser = (payload) =>API.get(user_endpoint, payload);
export const getAllExistingUsers = () =>API.get(user_endpoint);
export const updateExistingUser = (payload) =>API.patch(`${user_endpoint}/${payload._id}`, payload)

export const createNewPost = (payload) =>API.post(post_endpoint, payload)
export const updatePrevPost = (payload) =>API.patch(`${post_endpoint}/${payload._id}`, payload)
export const getPrevPost = (payload) =>API.get(`api/post/${payload}`, {params:{id: payload}})
export const getAllPrevPosts = () =>API.get(post_endpoint)
export const deleteClickedPost = (payload) =>API.delete(`${post_endpoint}/${payload._id}`, {params:{_id: payload}})
export const uploadImageToPulic =(payload) =>API.post("/api/upload", payload);

export const createNewComment = (payload) =>API.post(comment_endpoint, payload)
export const deleteClickedComment = (payload) =>API.delete(comment_endpoint, {params: payload})
export const likeClickedComment = (payload) => API.patch(`${comment_endpoint}/1`, payload)
export const updateClickedComment = (payload) =>API.patch(`${comment_endpoint}/2`, payload)

export const createNewReply =(payload) =>API.patch(`${reply_endpoint}/1`, payload)
export const likeClickedReply =(payload) => API.patch(`${reply_endpoint}/2`, payload)
export const updateClickedReply =(payload) =>API.patch(`${reply_endpoint}/3`, payload)
export const deleteClickedReply = (payload)=>API.patch(reply_endpoint, payload)

export const createNewChat =(payload)=>API.post(message_endpoint, payload)
export const getAllClickedChats =() =>API.get(message_endpoint)

export const connectNewSocket =() =>API.get(socket_endpoint)