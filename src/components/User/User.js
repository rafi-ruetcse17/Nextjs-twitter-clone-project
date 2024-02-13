import React, { useState } from "react";
import styles from "./User.module.css";
import { updateUser } from "@/libs/actions/userAction";

const User = ({ user, currentUser}) => {
  const [clicked, setClicked] = useState(false);
  
  const handleFollow = async () => {
    const updatedFollowing = [...currentUser?.following, user?._id];
    const updatedFollower = [...user?.followers, currentUser?._id];
    await updateUser({ _id: currentUser?._id, following: updatedFollowing });
    await updateUser({ _id: user?._id, followers: updatedFollower });

    setClicked(true);
  };

  const handleUnfollow = async () => {
    const updatedFollowing = currentUser?.following.filter((id) => id !== user?._id);
    const updatedFollower = user?.followers.filter((id) => id !== currentUser?._id);
  
    await updateUser({ _id: currentUser?._id, following: updatedFollowing });
    await updateUser({ _id: user?._id, followers: updatedFollower });
  
    setClicked(false);  
  };
  

  return (
    <div className={styles["container"]}>
      <div className={styles["user-image"]}>
        <img src={user?.image} alt="" />
      </div>
      <div className={styles["name-and-follow"]}>
        <div className={styles["name-section"]}>
          <div className={styles["name"]}>{user?.name}</div>
          <div className={styles["username"]}>@{user?.username}</div>
        </div>

        {!clicked && (
          <button
            className={styles["follow-btn"]}
            onClick={(e) => {
              e.stopPropagation()
              handleFollow()}}
          >
            Follow
          </button>
        )}

        {clicked && (
          <button className={styles["follow-btn"]}
          onClick={(e) => {
            e.stopPropagation()
            handleUnfollow()}}
          > Following </button>
        )}
      </div>
    </div>
  );
};

export default User;