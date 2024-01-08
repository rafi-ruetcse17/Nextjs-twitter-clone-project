import React, {useState} from "react";
import styles from "@/components/Post/Post.module.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Moment from "react-moment";
import { BsChat } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";

const Post = ({ post }) => {
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);

  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div className={styles["container"]} onClick={() => router.push(`/${id}`)}>
      <div className={styles["user-container"]}>
        <div>
          <img
            src={session?.user?.image}
            alt=""
            className={styles["user-img"]}
          />
        </div>

        <div>
          <div className={styles["user-details"]}>
            <h3 className={styles["user-name"]}>{post?.username}</h3>

            <div className={styles["user-id"]}>
              <p className={styles["user-tag"]}>
                @{post?.username} &nbsp; .&nbsp;
              </p>
              <p className={styles["post-tag"]}>
                <Moment fromNow>{post?.timestamp}</Moment>
              </p>
            </div>
          </div>

          <p className={styles["post-details"]}>{post?.text}</p>
          <img
            className={styles["post-img"]}
            src={post?.image}
            alt=""
          />
          {/* <div className="flex justify-between text-[20px] mt-4 w-[80%]">
            <div className="flex gap-1 items-center">
              <BsChat
                className="hoverEffect w-7 h-7 p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  //openModal();
                }}
              />
              {comments.length > 0 && (
                <span className="text-sm">{comments.length}</span>
              )}
            </div>

            {session.user.uid !== post?.id ? (
              <FaRetweet className="hoverEffect w-7 h-7 p-1" />
            ) : (
              <RiDeleteBin5Line
                className="hoverEffect w-7 h-7 p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  //deleteDoc(doc(db, "posts", id));
                }}
              />
            )}

            <div
              className="flex gap-1 items-center"
              onClick={(e) => {
                e.stopPropagation();
                //likePost();
              }}
            >
              {liked ? (
                <AiFillHeart className="hoverEffect w-7 h-7 p-1 text-pink-700" />
              ) : (
                <AiOutlineHeart className="hoverEffect w-7 h-7 p-1" />
              )}

              {likes.length > 0 && (
                <span className={`${liked && "text-pink-700"} text-sm`}>
                  {likes.length}
                </span>
              )}
            </div>

            <AiOutlineShareAlt className="hoverEffect w-7 h-7 p-1" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Post;
