import React from "react";
import styles from "./NameComp.module.css";
import { useRouter } from "next/router";

const NameComp = ({ users, post }) => {
  const router = useRouter();
  return (
    <div>
      {users &&
        users.map((userData) => {
          if (userData._id === post.userId) {
            return <div key={userData._id} 
            className={styles["name-comp"]}
            onClick={()=>router.push(`/${userData?.username}`)}>{userData?.name}</div>
          }
          return null;
        })}
    </div>
  );
};

export default NameComp;
