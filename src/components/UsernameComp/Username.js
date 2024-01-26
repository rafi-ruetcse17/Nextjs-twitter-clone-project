import React from "react";
import styles from "./Username.module.css";

const Username = ({ users, post }) => {
  return (
    <div>
      {users &&
        users.map((userData) => {
          if (userData._id === post.userId) {
            return (
              <p key={userData._id} className={styles["user-tag"]}>
                @{userData?.username} &nbsp; .&nbsp;
              </p>
            );
          }
          return null;
        })}
    </div>
  );
};

export default Username;
