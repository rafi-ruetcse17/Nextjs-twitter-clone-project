import React from "react";
import styles from "./ImageComp.module.css";

const ImageComp = ({ users, post }) => {
  return (
    <div>
      {users &&
        users.map((userData) => {
          if (userData._id === post.userId) {
            return (
              <img
                key={userData._id}
                src={userData.image}
                alt=""
                className={styles["user-img"]}
              />
            );
          }
          return null;
        })}
    </div>
  );
};

export default ImageComp;
