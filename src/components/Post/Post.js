import React, {useState, useEffect} from "react";
import styles from "@/components/Post/Post.module.css";
import Modal from "../Modal/Modal";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { deletePost, getAllPosts, getPost, updatePost } from "@/libs/actions/postAction";
import Moment from "react-moment";
import { BsChat } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const Post = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState(null);

  const Posts = useSelector((state)=>state.posts)
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()

  useEffect(() => {
    getFromDatabase()
    if(Posts)
      setPosts(Posts)
  }, [Posts]);

  const getFromDatabase = async () => {
    try {
      const response = await getAllPosts(user.email);
      setPosts(response);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const likePost = async(postId, postLikes) =>{
    if(postLikes.includes(user?.email)){
      const updatedLikes = postLikes.filter(email => email !== user?.email);
      try {
        await updatePost({ _id: postId, likes:updatedLikes });
        const updatedPosts= await getAllPosts(user?.email)
        dispatch({ type: 'SET_POSTS', payload: updatedPosts })
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      return
    }
    try {
      const response = await getPost(postId);
      let likes_array = response.likes;
      likes_array.push(user.email)
      setLikes(likes_array)
      await updatePost({ _id: postId, likes:likes_array });
      const updatedPosts= await getAllPosts(user?.email)
      dispatch({ type: 'SET_POSTS', payload: updatedPosts })
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  const handleDelete = async(postId) =>{
    try{
      await deletePost(postId);
      const updatedPosts= await getAllPosts(user?.email)
      dispatch({ type: 'SET_POSTS', payload: updatedPosts })
    }catch(error){
      console.error("Error fetching posts:", error);
    }
  }
  const toggleModal = async(postId, state)=>{
    try {
      await updatePost({ _id: postId, showModal:state });
      const updatedPosts= await getAllPosts(user?.email)
      dispatch({ type: 'SET_POSTS', payload: updatedPosts })
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  return (
    <>
      {posts?.map((post)=>(
        <div key={post._id} className={styles["container"]} onClick={() => router.push(`/${id}`)}>
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
              <div className={styles["icons-container"]}>
                <div className={styles["comments"]}>
                  <BsChat
                    className={styles["icon"]}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleModal(post._id, true)
                      //openModal();
                    }}
                  />
                  {post?.showModal && <Modal post={post} user={user}
                    onClose={() => toggleModal(post._id,false)}/>}
                  {comments.length > 0 && (
                    <span className={styles["comment-text"]}>{comments.length}</span>
                  )}
                </div>

                {user?.email!== post?.email ? (
                  <FaRetweet className={styles["icon"]} />
                ) : (
                  <RiDeleteBin5Line
                    className={styles["icon"]}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(post._id)
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
                    <span className={styles[liked?"liked-color": "comment-text"]}>
                      {post.likes.length}
                    </span>
                  )}
                </div>

                <AiOutlineShareAlt className={styles["icon"]} />
              </div>
            </div>
          </div>
        </div>
        ))}
    </>
  );
};

export default Post;
