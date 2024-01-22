import React, { useState } from "react";
import styles from "./User.module.css";
import { getAllUsers, updateUser } from "@/libs/actions/userAction";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";

const User = ({ user, currentUser }) => {
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  

  const handleFollow = async () => {
    const updatedFollowing = [...currentUser?.following, user?._id];
    const updatedFollower = [...user?.followers, currentUser?._id];
    await updateUser({ _id: currentUser?._id, following: updatedFollowing });
    await updateUser({ _id: user?._id, followers: updatedFollower });

    const data = await getAllUsers();
    console.log(data);
    dispatch({ type: "SET_USERS", payload: data });
    setClicked(true);
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
            onClick={() => handleFollow()}
          >
            Follow
          </button>
        )}

        {clicked && (
          <button className={styles["follow-btn"]}> Following </button>
        )}
      </div>
    </div>
  );
};

export default User;
