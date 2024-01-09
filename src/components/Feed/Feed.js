import React, { useEffect, useState } from "react";
import { HiOutlineSparkles } from "react-icons/hi";
import styles from "@/components/Feed/Feed.module.css";
import Input from "../Input/Input";
import { getAllPosts } from "@/libs/actions/postAction";
import { useSession } from "next-auth/react";
import Post from "../Post/Post";

const Feed = ({user}) => {
  const [posts, setPosts] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [rerender, setRerender] = useState(false);
  
  const { data: session } = useSession();
  //console.log(rerender, posts,imageSrc);
  return (
    <section className={styles["container"]}>
      <div className={styles["home"]}>
        Home
        <HiOutlineSparkles />
      </div>

      <Input  user = {user} />
      <Post user = {user}/>
      {/* {Array.isArray(posts) ? (
        posts.map((post) => (
          <Post key={post._id} post={post} />
        ))
      ) : (
        <div>No posts available</div>
      )} */}
    </section>
  );
};

export default Feed;
