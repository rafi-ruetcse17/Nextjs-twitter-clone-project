import React, { useState, useEffect } from "react";
import styles from "@/components/Post/Post.module.css";
import Modal from "../Modal/Modal";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "@/libs/actions/postAction";
import Moment from "react-moment";
import { BsChat } from "react-icons/bs";
import { FaRegEdit, FaReply, FaRetweet } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../Comment/Comment";
import UpdateModal from "../UpdateModal/UpdateModal";
import { getAllUsers } from "@/libs/actions/userAction";
import ImageComp from "../ImageComp/ImageComp";
import NameComp from "../NameComp/NameComp";
import Username from "../UsernameComp/Username";

const Post = ({ sessionUser, user }) => {
  const [loading, setLoading] = useState(true);
  const [postModalStates, setPostModalStates] = useState({});
  const Posts = useSelector((state) => state.posts);
  const Users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    getPostsFromDatabase();
    getUsersFromDatabase();
  }, []);

  const getUsersFromDatabase = async () => {
    try {
      const response = await getAllUsers();
      dispatch({ type: "SET_USERS", payload: response });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getPostsFromDatabase = async () => {
    try {
      const response = await getAllPosts();
      const filteredPosts = response?.filter(
        (post) =>
          user?.following?.includes(post?.userId) || post?.userId === user._id
      );

      if (filteredPosts) {
        dispatch({ type: "SET_POSTS", payload: filteredPosts });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const likePost = async (postId, postLikes) => {
    if (postLikes.includes(user?.email)) {
      const updatedLikes = postLikes.filter((email) => email !== user?.email);
      try {
        await updatePost({ _id: postId, likes: updatedLikes });
        getPostsFromDatabase();
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      return;
    }
    try {
      const response = await getPost(postId);
      let likes_array = response.likes;
      likes_array.push(user.email);
      await updatePost({ _id: postId, likes: likes_array });
      getPostsFromDatabase();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      Posts?.map(async (post) => {
        if (post.retweetedPostId === postId) {
          await deletePost(post._id);
          getPostsFromDatabase();
        }
      });
      getPostsFromDatabase();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const toggleModal = (postId, modalType) => {
    setPostModalStates((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [modalType]: !prev[postId]?.[modalType],
      },
    }));
  };

  const handleReTweet = async (post) => {
    const user = Users.find((user) => user._id === post.userId);
    const repostedPost = {
      userId: user._id,
      isRetweeted: true,
      retweetedPostId: post._id,
      retweetedBy: sessionUser._id,
      text: post.text,
      image: post.image,
    };
    await createPost(repostedPost);
    alert(`You successfully Shared the post of @${user.username}!`);
    getPostsFromDatabase();
  };

  if (loading) {
    return <div>loading....</div>;
  }

  return (
    <>
      {Posts?.map((post) => (
        <div
          key={post?._id}
          className={styles["container"]}
          // onClick={() => router.push(`/${user.email}/${post._id}`)}
        >
          {post.retweetedBy && (
            <div className={styles["retweet-container"]}>
              <div>
                <FaRetweet />
              </div>
              {post.retweetedBy === user._id ? (
                <div>You retweeted this post.</div>
              ) : (
                <div>
                  @
                  {
                    Users.find((user) => user._id === post.retweetedBy)
                      ?.username
                  }{" "}
                  retweeted this post.{" "}
                </div>
              )}
            </div>
          )}

          <div className={styles["user-container"]}>
            <div>
              <ImageComp users={Users} post={post} />
            </div>

            <div>
              <div className={styles["user-details"]}>
                <div className={styles["name-edit"]}>
                  <h3 className={styles["user-name"]}>
                    <NameComp users={Users} post={post} />
                  </h3>
                </div>
                {postModalStates[post._id]?.update && (
                  <UpdateModal
                    post={post}
                    user={user}
                    onClose={() => toggleModal(post._id, "update")}
                    comment={null}
                    onUpdate={getPostsFromDatabase}
                    posts={Posts}
                  />
                )}

                <div className={styles["user-id"]}>
                  <Username users={Users} post={post} />
                  <p className={styles["post-tag"]}>
                    <Moment fromNow>{post?.createdAt}</Moment>
                  </p>
                  {post?.userId === user?._id && !post?.retweetedBy && (
                    <span>
                      <FaRegEdit
                        className={styles["edit-icon"]}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleModal(post._id, "update");
                        }}
                      />
                    </span>
                  )}
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
                  toggleModal(post._id, "comment");
                }}
              />
              {postModalStates[post._id]?.comment && (
                <Modal
                  post={post}
                  user={user}
                  onClose={() => toggleModal(post._id, "comment")}
                  comment={null}
                  onUpdate={getPostsFromDatabase}
                  users={Users}
                />
              )}
              {post.comments.length > 0 && (
                <span className={styles["comment-text"]}>
                  {post.comments.length}
                </span>
              )}
            </div>

            {(user?.email === post?.email && !post?.retweetedBy) ||
            post?.retweetedBy == user?._id ? (
              <RiDeleteBin5Line
                className={styles["icon"]}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(post._id);
                }}
              />
            ) : (
              <FaRetweet
                className={styles["icon"]}
                onClick={() => handleReTweet(post)}
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
                  users={Users}
                  onUpdate={() => getPostsFromDatabase()}
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
                        users={Users}
                        onUpdate={() => getPostsFromDatabase()}
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
