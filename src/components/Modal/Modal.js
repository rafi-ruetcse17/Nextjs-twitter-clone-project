import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css"
import { AiOutlineClose, AiOutlineGif } from "react-icons/ai";
import { BsEmojiSmile, BsImage } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md"
import { RiBarChart2Line } from "react-icons/ri";
import Moment from "react-moment";
import { createComment, getAllPosts , createReply} from "@/libs/actions/postAction";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";

const Modal = ({ post, user, onClose, comment}) => {
  const [input, setInput] = useState("")
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch()
  const {data: session} = useSession()

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
      let Url = null;
      if (selectedImage) {
        const body = new FormData();
        body.append("file", selectedImage);
        const res = await fetch("/api/upload", {
          method: "POST",
          body,
        });
        if (!res.ok) {
          throw new Error("Failed to upload image!");
        }
        Url = await res.json();
      }
      if(comment){
        if(Url)
          await(createReply({_id: post._id, commentId:comment._id,
            newReply: {username:user.name, email:user.email, text:input, image: Url}}))
        else
          await(createReply({_id: post._id, commentId:comment._id,
            newReply: {username:user.name, email:user.email, text:input}}))
      }
      else{
        if(Url)
          await(createComment({_id: post._id, 
            newComment: {username:user.name, email:user.email, text:input, image: Url}}))
        else
          await(createComment({_id: post._id, 
            newComment: {username:user.name, email:user.email, text:input}}))
      }

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
            <img className={styles["rounded"]} src={session?.user?.image} alt="" />
          </div>

          <div>
            <div className={styles["post-details"]}>
              <h3>{comment?comment.username:post?.username}</h3>
              <h4 className={styles["timestamp"]}>
                . <Moment fromNow>{comment?comment.timestamp:post?.timestamp}</Moment>
              </h4>
            </div>
            <p className={styles["text"]}>{comment?comment.text:post?.text}</p>

            <img
              src={comment?comment.image:post?.image}
              className={styles["post-image"]}
              alt=""
            />

            <p className={styles["comment"]}>
              Replying to: <span className={styles["username"]}>@{comment?comment.username:post?.username}</span>
            </p>
          </div>

          <div className={styles["comment-user"]}>
            <img className={styles["rounded"]} src={session?.user?.image} alt="" />
          </div>

          <div className={styles["comment-user"]}>
            <textarea
              className={styles["textarea"]}
              rows="4"
              placeholder="Post your reply"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {selectedFile && (
              <div className={styles["selected-file"]}>
                <div onClick={() => setSelectedFile(null)}>
                  <AiOutlineClose className={styles["selected-file-icon"]} />
                </div>

                <img src={selectedFile} className={styles["input-img"]} alt="" />
              </div>
            )}

            <div className={styles["options"]}>
              <div className={styles["icons"]}>
              <label htmlFor="cmnt-file">
                <BsImage />
                </label>

                <input id="cmnt-file" type="file" hidden onChange={addImageToComment} />

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
