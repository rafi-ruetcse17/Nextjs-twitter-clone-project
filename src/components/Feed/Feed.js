import React, { useEffect, useState } from "react";
import { HiOutlineSparkles } from "react-icons/hi";
import styles from "@/components/Feed/Feed.module.css";
import Input from "../Input/Input";
import { getAllPosts } from "@/libs/actions/postAction";
import { useSession } from "next-auth/react";
import Post from "../Post/Post";

const Feed = () => {
  const [posts, setPosts] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const { data: session } = useSession();
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    getFromDatabase();
  }, []);

  const getFromDatabase = async () => {
    try {
      const response = await getAllPosts(session?.user?.email);
      setPosts(response);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  

  //console.log(rerender, posts,imageSrc);
  return (
    <section className={styles["container"]}>
      <div className={styles["home"]}>
        Home
        <HiOutlineSparkles />
      </div>

      <Input callback={() => setRerender((prev) => !prev)} />
      
      {Array.isArray(posts) ? (
        posts.map((post) => (
          <Post key={post._id} post={post} />
        ))
      ) : (
        <div>No posts available</div>
      )}
    </section>
  );
};

export default Feed;
