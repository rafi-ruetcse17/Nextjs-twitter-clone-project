import React, { useState } from "react";
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

const Profile = ({ user, post }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [toggle, setToggle] = useState(false);

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
        <b>{session?.user?.name}</b>
      </div>
      <img src="/images/rafi-cover1.jpg" alt="" className={styles["cover-photo"]} />
      
      <div className={styles["container"]}>
        <div className={styles["user-container"]}>
          <div>
            <img
              src={session?.user?.image}
              alt=""
              className={styles["user-img"]}
            />
          </div>
          <button className={styles["edit-profile-btn"]}>Edit Profile</button>
        </div>

        <div>
            <h4>{session?.user?.name}</h4>
        </div>
      </div>
    </section>
  );
};

export default Profile;
