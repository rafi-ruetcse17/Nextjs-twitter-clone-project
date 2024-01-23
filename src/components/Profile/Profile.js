import React, { useEffect, useState } from "react";
import Comment from "../Comment/Comment";
import { FaRegEdit, FaRetweet } from "react-icons/fa";
import { BsArrowLeft, BsChat } from "react-icons/bs";
import Modal from "../Modal/Modal";
import UpdateModal from "../UpdateModal/UpdateModal";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import styles from "./Profile.module.css";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import ViewPost from "../ViewPost/ViewPost";
import { getAllPosts } from "@/libs/actions/postAction";
import Image from "next/image";
import EditProfileModal from "../EditProfileMpdal/EditProfileModal";

const Profile = ({sessionUser, user, user_posts}) => {
  //console.log(user_posts);
  const router = useRouter();
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [posts, setPosts] = useState(null);
  const [postClick, setPostClick] = useState(true);
  const [mediaClick, setMediaClick] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  
  // const Posts = useSelector((state) => state.posts);
  // useEffect(() => {
  //   getFromDatabase();
  //   if (Posts) {
  //     const userPosts = Posts.filter(post => post._id === user._id);
  //     setPosts(userPosts);
  //   }
  //   console.log(posts);
  // }, [Posts]);

  const getFromDatabase = async () => {
    try {
      const response = await getAllPosts(user?.email);
      setPosts(response);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePosts = () =>{
    setPostClick(true);
    setMediaClick(false);
  }

  const handleMedia = () =>{
    setMediaClick(true);
    setPostClick(false);
  }

  const toggleModal = (postId, state) => {
    setToggle(state);
  };
  return (
    <section className={styles["main-container"]}>
      <div className={styles["back-arrow"]}>
        <BsArrowLeft
          className={styles["back-icon"]}
          onClick={(e) => {
            router.push(`/home`);
            e.stopPropagation();
          }}
        />
        <b>{user?.name}</b>
      </div>
      <img
        src="/images/cover.png"
        alt=""
        className={styles["cover-photo"]}
      />

      <div className={styles["container"]}>
        <div className={styles["user-container"]}>
          <div>
            <img
              src={user?.image}
              alt=""
              className={styles["user-img"]}
            />
          </div>
          {sessionUser?._id===user?._id? 
            <button className={styles["edit-profile-btn"]}
            onClick={()=>setShowModal(true)}
            >Edit Profile</button>
            :<button className={styles["edit-profile-btn"]}>Follow</button>
          }
          {showModal && <EditProfileModal sessionUser={sessionUser} onClose={()=>setShowModal(false)}/>}

        </div>

        <div className={styles["name"]}>
          <div>
            <b>{user?.name}</b>
          </div>
          <div>@{user?.username}</div>
        </div>

        <div className={styles["follow"]}>
          <Link href="#" className={styles["following"]}>
            <b>{user?.following?.length}</b> Following</Link>
          <Link href="#" className={styles["following"]}>
            <b>{user?.followers?.length}</b> Followers</Link>
        </div>

        <nav>
          <div className={styles[postClick? "clicked":""]} 
          onClick={(e)=>{
          e.stopPropagation()
          handlePosts()}}>Posts</div>
          <div className={styles[mediaClick? "clicked":""]} 
          onClick={(e)=>{
          e.stopPropagation()
          handleMedia()}}>Media</div>
        </nav>
        
      </div>
      <hr/>
      {postClick && user_posts?.map((post)=>(
        <div key={post._id} className={styles["main"]}>
        <ViewPost user={user} post={post}/>
        </div>
      ))}
      <div className={styles["media-container"]}>
        {mediaClick && user_posts?.map((post)=>(
          post.image && <div key={post._id} className={styles["media"]}>
            <img src={post?.image} alt="no image"/>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Profile;
