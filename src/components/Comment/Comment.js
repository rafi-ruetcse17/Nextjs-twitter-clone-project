import React, { useState } from "react";
import styles from "@/components/Comment/Comment.module.css";
import Modal from "../Modal/Modal";
import {
  deleteComment,
  updateCommentLikes,
  updateReplyLikes,
  deleteReply,
} from "@/libs/actions/postAction";
import Moment from "react-moment";
import { BsChat } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import UpdateModal from "../UpdateModal/UpdateModal";
import ImageComp from "../ImageComp/ImageComp";
import Username from "../UsernameComp/Username";
import NameComp from "../NameComp/NameComp";

const Comment = ({ post, comment, postId, user, isReply, users, onUpdate }) => {
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [liked, setLiked] = useState(false);

  const likeComment = async (commentLikes, commentId) => {
    if (commentLikes.includes(user?.email)) {
      const updatedLikes = commentLikes.filter(
        (email) => email !== user?.email
      );
      try {
        if (isReply) {
          await updateReplyLikes({
            postId,
            commentId: isReply,
            replyId: comment._id,
            likesArray: updatedLikes,
          });
        } else
          await updateCommentLikes({
            postId,
            commentId,
            likesArray: updatedLikes,
          });

        onUpdate();
        setLiked(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      return;
    }
    try {
      const updatedLikes = [...commentLikes, user?.email];
      if (isReply)
        await updateReplyLikes({
          postId,
          commentId: isReply,
          replyId: comment._id,
          likesArray: updatedLikes,
        });
      else
        await updateCommentLikes({
          postId,
          commentId,
          likesArray: updatedLikes,
        });

      onUpdate();
      setLiked(true);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const handleDelete = async (commentId) => {
    try {
      if (isReply)
        await deleteReply({ postId, commentId: isReply, replyId: comment._id });
      else await deleteComment({ postId, commentId });

      onUpdate();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const toggleModal = async (state, operation) => {
    if (operation == "reply") {
      setShowReplyModal(state);
    } else {
      setShowUpdateModal(state);
    }
  };

  return (
    <>
      <div className={styles[isReply ? "container" : ""]}>
        <div className={styles["user-container"]}>
          <div>
            <ImageComp users={users} post={comment} />
          </div>

          <div
            className={styles[!isReply ? "cmnt-container" : "reply-container"]}
          >
            <div className={styles["user-details"]}>
              <h4 className={styles["user-name"]}>
                <NameComp users={users} post={comment} />
              </h4>

              <div className={styles["user-id"]}>
                <Username users={users} post={comment} />
                <p className={styles["post-tag"]}>
                  <Moment fromNow>{comment?.createdAt}</Moment>
                </p>
              </div>
            </div>

            <p className={styles["post-details"]}>{comment?.text}</p>
            <img className={styles["post-img"]} src={comment?.image} alt="" />
            <div className={styles["icons-container"]}>
              {!isReply && (
                <div className={styles["comments"]}>
                  <BsChat
                    className={styles["icon"]}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleModal(true, "reply");
                    }}
                  />
                  {comment?.replies?.length > 0 && (
                    <span className={styles["comment-text"]}>
                      {comment.replies.length}
                    </span>
                  )}
                  {showReplyModal && (
                    <Modal
                      post={post}
                      user={user}
                      onClose={() => toggleModal(false, "reply")}
                      comment={comment}
                      onUpdate={onUpdate}
                      users={users}
                    />
                  )}
                </div>
              )}

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

              {comment.userId === user._id && (
                <FiEdit
                  className={styles["icon"]}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleModal(true, "edit");
                  }}
                />
              )}
              {showUpdateModal && (
                <UpdateModal
                  post={post}
                  user={user}
                  onClose={() => toggleModal(false, "edit")}
                  comment={comment}
                  onUpdate={onUpdate}
                  commentId={isReply}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
