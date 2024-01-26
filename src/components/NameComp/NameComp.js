import React from "react";
import styles from "./NameComp.module.css";

const NameComp = ({ users, post }) => {
  return (
    <div>
      {users &&
        users.map((userData) => {
          if (userData._id === post.userId) {
            return <div key={userData._id}>{userData?.name}</div>
          }
          return null;
        })}
    </div>
  );
};

export default NameComp;
