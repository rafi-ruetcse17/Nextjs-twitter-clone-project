import axios from "axios";

const api_endpoint = '/api/user';
const post_endpoint = '/api/post';
const comment_endpoint = '/api/post/comment'
const reply_endpoint = '/api/post/reply'
const message_endpoint = '/api/message'
const API = axios.create({ baseURL: "http://localhost:3000" })

API.interceptors.request.use((req)=>{
    if(!req.url.includes(comment_endpoint))
        req.headers["Content-Type"] = "application/json";
    return req;
})

API.interceptors.response.use((res) => {
    return res
});

export const createNewUser = (payload) =>API.post(api_endpoint, payload);
export const getExistingUser = (payload) =>API.get(api_endpoint, payload);
export const getAllExistingUsers = () =>API.get(api_endpoint);
export const updateExistingUser = (payload) =>API.patch(api_endpoint, payload)


export const createNewPost = (payload) =>API.post(post_endpoint, payload)
export const updatePrevPost = (payload) =>API.patch(post_endpoint, payload)
export const getPrevPost = (payload) =>API.get(`api/post/${payload}`, {params:{id: payload}})
export const getAllPrevPosts = (payload) =>API.get(post_endpoint, {params:{email: payload}})
export const deleteClickedPost = (payload) =>API.delete(post_endpoint, {params:{_id: payload}})


export const createNewComment = (payload) =>API.post(comment_endpoint, payload)
export const deleteClickedComment = (payload) =>API.delete(comment_endpoint, {params: 
    payload})

export const likeClickedComment = (payload) => {
    const headers = {
        "Content-Type": "application/json",
        "X-Api-Purpose": "LikeComment"
    };
    return API.patch(comment_endpoint, payload, { headers });
};

export const updateClickedComment = (payload) => {
    const headers = {
        "Content-Type": "application/json",
        "X-Api-Purpose": "UpdateComment", 
    };
    return API.patch(comment_endpoint, payload, { headers });
};

export const createNewReply =(payload) =>{
    const headers = {
        "Content-Type": "application/json",
        "X-Api-Purpose": "CreateReply", 
    };
    return API.patch(reply_endpoint, payload, {headers})
}
export const updateClickedReply =(payload) =>{
    const headers = {
        "Content-Type": "application/json",
        "X-Api-Purpose": "UpdateReply", 
    };
    return API.patch(reply_endpoint, payload, {headers})
}
export const likeClickedReply =(payload) =>{
    const headers = {
        "Content-Type": "application/json",
        "X-Api-Purpose": "LikeReply", 
    };
    return API.patch(reply_endpoint, payload, {headers})
}

export const deleteClickedReply = (payload)=>API.patch(reply_endpoint, payload)


//message
export const createNewConversation =(payload)=>API.post(message_endpoint, payload)
export const markMessagesAsSeen =(payload) =>API.patch(message_endpoint, payload)