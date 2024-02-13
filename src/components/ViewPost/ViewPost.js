import React, { useState } from "react";
import { FaRetweet } from "react-icons/fa";
import { BsChat } from "react-icons/bs";
import UpdateModal from "../UpdateModal/UpdateModal";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import styles from "./ViewPost.module.css";
import Moment from "react-moment";

const ViewPost = ({ user, post }) => {
  const [liked, setLiked] = useState(false);
  const [toggle, setToggle] = useState(false);

  const toggleModal = (postId, state) => {
    setToggle(state);
  };
  return (
    <section className={styles["main-container"]}>
      <div className={styles["container"]}>
        <div className={styles["user-container"]}>
          <div>
            <img src={user?.image} alt="" className={styles["user-img"]} />
          </div>

          <div>
            <div className={styles["user-details"]}>
              <h3 className={styles["user-name"]}>{user?.name}</h3>

              {toggle && (
                <UpdateModal
                  post={post}
                  user={user}
                  onClose={() => toggleModal(post._id, false)}
                />
              )}

              <div className={styles["user-id"]}>
                <p className={styles["user-tag"]}>
                  @{user?.username} &nbsp; .&nbsp;
                </p>
                <p className={styles["post-tag"]}>
                  <Moment fromNow>{post?.timestamp}</Moment>
                </p>
              </div>
            </div>

            <p className={styles["post-details"]}>{post?.text}</p>
            <img className={styles["post-img"]} src={post?.image} alt="" />
          </div>
        </div>

        <div className={styles["icons-container"]}>
          <div className={styles["comments"]}>
            <BsChat
              className={styles["icon"]}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />

            {post.comments.length > 0 && (
              <span className={styles["comment-text"]}>
                {post.comments.length}
              </span>
            )}
          </div>

          {user?.email !== post?.email ? (
            <FaRetweet className={styles["icon"]} />
          ) : (
            <RiDeleteBin5Line
              className={styles["icon"]}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          )}

          <div
            className={styles["post-like"]}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {post?.likes?.includes(user?.email) ? (
              <AiFillHeart className={styles["liked"]} />
            ) : (
              <AiOutlineHeart className={styles["icon"]} />
            )}

            {post?.likes?.length > 0 && (
              <span className={styles[liked ? "liked-color" : "comment-text"]}>
                {post.likes.length}
              </span>
            )}
          </div>

          <AiOutlineShareAlt className={styles["icon"]} />
        </div>
      </div>
    </section>
  );
};

export default ViewPost;
