import React, { useState, useEffect } from "react";
import styles from "@/components/Comment/Comment.module.css";
import Modal from "../Modal/Modal";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  deleteComment,
  updateComment,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
  updateCommentLikes,
} from "@/libs/actions/postAction";
import Moment from "react-moment";
import { BsChat } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const Comment = ({ comment, postId, user }) => {
  const { data: session } = useSession();

  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false)
  //   const [likes, setLikes] = useState([]);
  //   const [liked, setLiked] = useState(false);
  //   const [comments, setComments] = useState([]);
  //   const [posts, setPosts] = useState(null);

  //   const Posts = useSelector((state)=>state.posts)
  //   const router = useRouter();
  //   const { data: session } = useSession();
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     getFromDatabase()
  //     if(Posts)
  //       setPosts(Posts)
  //   }, [Posts]);

  //   const getFromDatabase = async () => {
  //     try {
  //       const response = await getAllPosts(user.email);
  //       setPosts(response);
  //     } catch (error) {
  //       console.error("Error fetching posts:", error);
  //     }
  //   };

  const likeComment = async (commentLikes, commentId) => {
    if (commentLikes.includes(user?.email)) {
      const updatedLikes = commentLikes.filter((email) => email !== user?.email);
      try {
        await updateCommentLikes({postId, commentId, likesArray:updatedLikes });
        const updatedPosts = await getAllPosts(user?.email);
        dispatch({ type: "SET_POSTS", payload: updatedPosts });
        setLiked(false)
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      return;
    }
    try {
      const updatedLikes = [...commentLikes, user?.email];
      await updateCommentLikes({postId, commentId, likesArray: updatedLikes });
      const updatedPosts = await getAllPosts(user?.email);
      dispatch({ type: "SET_POSTS", payload: updatedPosts });
      setLiked(true)
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment({ postId, commentId });
      const updatedPosts = await getAllPosts(user?.email);
      dispatch({ type: "SET_POSTS", payload: updatedPosts });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const toggleModal = async (postId, state) => {
    setShowModal(state)
    // try {
    //   await updatePost({ _id: postId, showModal: state });
    //   const updatedPosts = await getAllPosts(user?.email);
    //   dispatch({ type: "SET_POSTS", payload: updatedPosts });
    // } catch (error) {
    //   console.error("Error fetching posts:", error);
    // }
  };
  //console.log(posts.comments)
  return (
    <>
      <div
        className={styles["container"]}
        // onClick={() => router.push(`/${id}`)}
      >
        <div className={styles["user-container"]}>
          <div>
            <img
              src={session?.user?.image}
              alt=""
              className={styles["user-img"]}
            />
          </div>

          <div className={styles["cmnt-container"]}>
            <div className={styles["user-details"]}>
              <h4 className={styles["user-name"]}>{comment?.username}</h4>

              <div className={styles["user-id"]}>
                <p className={styles["user-tag"]}>
                  @{comment?.username} &nbsp; .&nbsp;
                </p>
                <p className={styles["post-tag"]}>
                  <Moment fromNow>{comment?.timestamp}</Moment>
                </p>
              </div>
            </div>

            <p className={styles["post-details"]}>{comment?.text}</p>
            <img className={styles["post-img"]} src={comment?.image} alt="" />
            <div className={styles["icons-container"]}>
              <div className={styles["comments"]}>
                <BsChat
                  className={styles["icon"]}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleModal(comment._id, true);
                    //openModal();
                  }}
                />
                {showModal && (
                  <Modal
                    post={comment}
                    user={user}
                    onClose={() => toggleModal(comment._id, false)}
                  />
                )}
                {/* {comments.length > 0 && (
                  <span className={styles["comment-text"]}>
                    {comments.length}
                  </span>
                )} */}
              </div>

              {user?.email !== comment?.email ? (
                <FaRetweet className={styles["icon"]} />
              ) : (
                <RiDeleteBin5Line
                  className={styles["icon"]}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(comment._id);
                  }}
                />
              )}

              <div
                className={styles["post-like"]}
                onClick={(e) => {
                  e.stopPropagation();
                  likeComment(comment.likes, comment._id);
                }}
              >
                {comment?.likes?.includes(user?.email) ? (
                  <AiFillHeart className={styles["liked"]} />
                ) : (
                  <AiOutlineHeart className={styles["icon"]} />
                )}

                {comment?.likes?.length > 0 && (
                  <span
                    className={styles[liked ? "liked-color" : "comment-text"]}
                  >
                    {comment.likes.length}
                  </span>
                )}
              </div>

              <AiOutlineShareAlt className={styles["icon"]} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
//line 100 session.user.image should be changed
