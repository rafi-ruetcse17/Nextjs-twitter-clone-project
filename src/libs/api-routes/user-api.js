import axios from "axios";

const api_endpoint = '/api/user';
const post_endpoint = '/api/post';
const comment_endpoint = '/api/post/comment'
const API = axios.create({ baseURL: "http://localhost:3000" })

API.interceptors.request.use((req)=>{
    req.headers["Content-Type"] = "application/json";
    return req;
})

API.interceptors.response.use((res) => {
    return res
});

export const createNewUser = (payload) =>API.post(api_endpoint, payload);
export const getExistingUser = (payload) =>API.get(api_endpoint, payload);
// export const updateScore = (payload) =>API.patch(api_endpoint, payload.updatedFields)
// export const getScore = (payload) =>API.get(api_endpoint, {params:{matchId: payload}});

export const createNewPost = (payload) =>API.post(post_endpoint, payload)
export const updatePrevPost = (payload) =>API.patch(post_endpoint, payload)
export const getPrevPost = (payload) =>API.get(`api/post/${payload}`, {params:{id: payload}})
export const getAllPrevPosts = (payload) =>API.get(post_endpoint, {params:{email: payload}})
export const deleteClickedPost = (payload) =>API.delete(post_endpoint, {params:{_id: payload}})


export const createNewComment = (payload) =>API.post(comment_endpoint, payload)
export const deleteClickedComment = (payload) =>API.delete(comment_endpoint, {params: 
    payload})

export const likeClickedComment = (payload)=>API.patch(comment_endpoint, payload);