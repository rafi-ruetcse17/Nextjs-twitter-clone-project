import React, { useState, useEffect } from "react";
import styles from "@/components/Post/Post.module.css";
import Modal from "../Modal/Modal";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "@/libs/actions/postAction";
import Moment from "react-moment";
import { BsChat, BsThreeDots } from "react-icons/bs";
import { FaRegEdit, FaReply, FaRetweet } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../Comment/Comment";
import UpdateModal from "../UpdateModal/UpdateModal";
import { BiReply } from "react-icons/bi";
import { getAllUsers } from "@/libs/actions/userAction";

const Post = ({ sessionUser, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState(null);
  const [posts, setPosts] = useState(null);

  const Posts = useSelector((state) => state.posts);
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  

  useEffect(() => {
    getPostsFromDatabase();
  }, [Posts]);

  // const getUsersFromDatabase = async () => {
  //   try {
  //     const response = await getAllUsers();
  //     setUsers(response);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  const getPostsFromDatabase = async () => {
    try {
      const response = await getAllPosts(user?.email);
      const filteredPosts = response?.filter((post) =>
      user?.following?.includes(post?.userId) || post?.userId===user._id
    );
    if (filteredPosts) {
      dispatch({ type: "SET_POSTS", payload: filteredPosts });
    }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const likePost = async (postId, postLikes) => {
    if (postLikes.includes(user?.email)) {
      const updatedLikes = postLikes.filter((email) => email !== user?.email);
      try {
        await updatePost({ _id: postId, likes: updatedLikes });
        getPostsFromDatabase()
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      return;
    }
    try {
      const response = await getPost(postId);
      let likes_array = response.likes;
      likes_array.push(user.email);
      setLikes(likes_array);
      await updatePost({ _id: postId, likes: likes_array });
      getPostsFromDatabase()
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      getPostsFromDatabase()
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const toggleModal = async (postId, state, modal_to_show) => {
    try {
      modal_to_show === "update"
        ? await updatePost({ _id: postId, showUpdateModal: state })
        : await updatePost({ _id: postId, showModal: state });
      getPostsFromDatabase()
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <>
      {Posts?.map((post) => (
        <div
          key={post?._id}
          className={styles["container"]}
          // onClick={() => router.push(`/${user.email}/${post._id}`)}
        >
          <div className={styles["user-container"]}>
            <div>
              <img
                src={post?.userImage}
                alt=""
                className={styles["user-img"]}
              />
            </div>

            <div>
              <div className={styles["user-details"]}>
                <div className={styles["name-edit"]}>
                  <h3 className={styles["user-name"]}>{post?.name}</h3>
                </div>
                {post?.showUpdateModal && (
                  <UpdateModal
                    post={post}
                    user={user}
                    onClose={() => toggleModal(post._id, false, "update")}
                    comment={null}
                  />
                )}

                <div className={styles["user-id"]}>
                  <p className={styles["user-tag"]}>
                    @{post?.username} &nbsp; .&nbsp;
                  </p>
                  <p className={styles["post-tag"]}>
                    <Moment fromNow>{post?.timestamp}</Moment>
                  </p>
                  {post.userId===user?._id  && <span>
                    <FaRegEdit
                      className={styles["edit-icon"]}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleModal(post._id, true, "update");
                      }}
                    />
                  </span>
                  }
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
                  toggleModal(post._id, true, "comment");
                  //openModal();
                }}
              />
              {post?.showModal && (
                <Modal
                  post={post}
                  user={user}
                  onClose={() => toggleModal(post._id, false, "comment")}
                  comment={null}
                />
              )}
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
                  handleDelete(post._id);
                }}
              />
            )}

            <div
              className={styles["post-like"]}
              onClick={(e) => {
                e.stopPropagation();
                likePost(post._id, post.likes);
              }}
            >
              {post?.likes?.includes(user?.email) ? (
                <AiFillHeart className={styles["liked"]} />
              ) : (
                <AiOutlineHeart className={styles["icon"]} />
              )}

              {post?.likes?.length > 0 && (
                <span
                  className={
                    styles[
                      post?.likes?.includes(user?.email)
                        ? "liked-color"
                        : "comment-text"
                    ]
                  }
                >
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
          {post?.comments?.length > 0 &&
            post.comments.map((comment) => (
              <div key={comment._id}>
                <Comment
                  key={comment._id}
                  post={post}
                  comment={comment}
                  postId={post._id}
                  user={user}
                  isReply={null}
                />

                {comment?.replies?.length > 0 && (
                  <div className={styles["reply"]}>
                    <div className={styles["view-cmnts"]}>
                      <FaReply className={styles["rep-icon"]} /> &nbsp;
                      <span>replies</span>
                    </div>
                    {comment.replies?.map((reply) => (
                      <Comment
                        key={reply._id}
                        post={post}
                        comment={reply}
                        postId={post._id}
                        user={user}
                        isReply={comment._id}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      ))}
    </>
  );
};

export default Post;
