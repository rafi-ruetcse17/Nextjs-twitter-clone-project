// src/actions.js
export const setPosts = (posts) => ({
  type: "SET_POSTS",
  payload: posts,
});

export const setUsers = (users) => ({
  type: "SET_USERS",
  payload: users,
});


export const setNotifications = (notifications) => ({
  type: "SET_NOTIFICATIONS",
  payload: notifications,
});