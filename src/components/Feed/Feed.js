import React from "react";
import { HiOutlineSparkles } from "react-icons/hi";
import styles from "@/components/Feed/Feed.module.css";
import Input from "../Input/Input";
import Post from "../Post/Post";

const Feed = ({user}) => {
  return (
    <section className={styles["container"]}>
      <div className={styles["home"]}>
        Home
        <HiOutlineSparkles />
      </div>

      <Input  user = {user} />
      <Post user = {user}/>

    </section>
  );
};

export default Feed;
