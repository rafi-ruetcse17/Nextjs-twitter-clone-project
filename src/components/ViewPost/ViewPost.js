import React, { useState } from "react";
import Comment from "../Comment/Comment";
import { FaRegEdit, FaRetweet } from "react-icons/fa";
import { BsArrowLeft, BsChat } from "react-icons/bs";
import Modal from "../Modal/Modal";
import UpdateModal from "../UpdateModal/UpdateModal";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import styles from "./ViewPost.module.css";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const ViewPost = ({ user, post }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [toggle, setToggle] = useState(false);

  const toggleModal = (postId, state) => {
    setToggle(state);
  };
  return (
    <section className={styles["main-container"]}>
      {/* <div className={styles["back-arrow"]}>
        <BsArrowLeft
          className={styles["back-icon"]}
          onClick={(e) => {
            router.push(`/home`);
            e.stopPropagation();
          }}
        />
        Post
      </div> */}
      <div className={styles["container"]}>
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
              <h3 className={styles["user-name"]}>
                {post?.username}
                <span>
                  <FaRegEdit
                    className={styles["edit-post"]}
                    onClick={() => toggleModal(post._id, true)}
                  />
                </span>
              </h3>

              {toggle && (
                <UpdateModal
                  post={post}
                  user={user}
                  onClose={() => toggleModal(post._id, false)}
                />
              )}

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
            <img className={styles["post-img"]} src={post?.image} alt="" />
          </div>
        </div>

        {post.comments?.length > 0 && <hr />}
        <div className={styles["icons-container"]}>
          <div className={styles["comments"]}>
            <BsChat
              className={styles["icon"]}
              onClick={(e) => {
                e.stopPropagation();
                //toggleModal(post._id, true);
              }}
            />
            {/* {post?.showModal && (
              <Modal
                post={post}
                user={user}
                // onClose={() => toggleModal(post._id, false)}
              />
            )} */}
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
                //handleDelete(post._id);
              }}
            />
          )}

          <div
            className={styles["post-like"]}
            onClick={(e) => {
              e.stopPropagation();
              //likePost(post._id, post.likes);
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
        {post.comments?.length > 0 && (
          <div>
            <hr />
            <div className={styles["view-cmnts"]}>View comments</div>
          </div>
        )}
        {post.comments?.length > 0 &&
          post.comments.map((comment) => (
            <Comment key={comment._id} comment={comment} user={user} />
          ))}
      </div>
    </section>
  );
};

export default ViewPost;
