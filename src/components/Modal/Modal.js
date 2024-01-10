import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css"
import { AiOutlineGif } from "react-icons/ai";
import { BsEmojiSmile, BsImage } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md"
import { RiBarChart2Line } from "react-icons/ri";
import Moment from "react-moment";
import { createComment, getAllPosts } from "@/libs/actions/postAction";
import { useDispatch } from "react-redux";

const Modal = ({ post, user, onClose}) => {
  const [input, setInput] = useState("")
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
//   const handleCloseClick = (e) => {
//     e.preventDefault();
//     onClose();
//   };
  const dispatch = useDispatch()

  const addImageToComment = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setSelectedImage(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const closeModal = (e)=>{
    e.preventDefault()
    onClose()
  }
  const sendComment = async()=>{
    try {
      await(createComment({_id: post._id, 
        newComment: {username:user.name, email:user.email, text:input}}))

      const updatedPosts= await getAllPosts(user?.email)
      dispatch({ type: 'SET_POSTS', payload: updatedPosts })
    } catch (error) {
      console.error("Error fetching posts:", error);
    }

    onClose()
  }

  const modalContent = (
    <div
      className={styles["modal-surrounding"]}
      onClick={closeModal}
    >
      <div
        className={styles["modal-container"]}
        onClick={(e) => e.stopPropagation()}
      >
        <MdClose className={styles["close-icon"]} onClick={closeModal} />

        <div className={styles["contents"]}>
          <div>
            <img className={styles["rounded"]} src={user?.image} alt="" />
          </div>

          <div>
            <div className={styles["post-details"]}>
              <h3>{post?.username}</h3>
              <h4 className={styles["timestamp"]}>
                . <Moment fromNow>{post?.timestamp}</Moment>
              </h4>
            </div>
            <p className={styles["text"]}>{post?.text}</p>

            <img
              src={post?.image}
              className={styles["post-image"]}
              alt=""
            />

            <p className={styles["comment"]}>
              Replying to: <span className={styles["username"]}>@{post?.username}</span>
            </p>
          </div>

          <div className={styles["comment-user"]}>
            <img className={styles["rounded"]} src={user?.image} alt="" />
          </div>

          <div className={styles["comment-user"]}>
            <textarea
              className={styles["textarea"]}
              rows="4"
              placeholder="Post your reply"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <div className={styles["options"]}>
              <div className={styles["icons"]}>
              <label htmlFor="file">
                <BsImage />
                </label>

                <input id="file" type="file" hidden onChange={addImageToComment} />

                <div className={styles["gif"]}>
                  <AiOutlineGif />
                </div>
                <RiBarChart2Line className={styles["barchart"]} />
                <BsEmojiSmile />
                <IoCalendarNumberOutline className={styles["other-icons"]} />
                <HiOutlineLocationMarker className={styles["other-icons"]} />
              </div>

              <button
                className={styles["reply-btn"]}
                disabled={!input.trim() && !selectedFile}
                onClick={sendComment}
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")
  );
};

export default Modal;
