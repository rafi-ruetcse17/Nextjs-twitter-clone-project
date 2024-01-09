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

const Modal = ({ post, user, onClose}) => {
  const [input, setInput] = useState("")
//   const handleCloseClick = (e) => {
//     e.preventDefault();
//     onClose();
//   };
  const closeModal = (e)=>{
    e.preventDefault()
    onClose()
  }
  const sendComment = ()=>{

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
                <BsImage />

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
                disabled={!input.trim()}
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
