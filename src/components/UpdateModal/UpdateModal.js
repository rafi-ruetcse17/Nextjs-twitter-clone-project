import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./UpdateModal.module.css"
import { AiOutlineClose, AiOutlineGif } from "react-icons/ai";
import { BsEmojiSmile, BsImage } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md"
import { RiBarChart2Line } from "react-icons/ri";
import Moment from "react-moment";
import { updateComment, updatePost, updateReply, uploadImage } from "@/libs/actions/postAction";

const UpdateModal = ({ post, user, onClose, comment, onUpdate, commentId, posts}) => {
  const [input, setInput] = useState(comment?comment.text:post.text)
  const [selectedFile, setSelectedFile] = useState(comment?comment.image:post.image);
  const [selectedImage, setSelectedImage] = useState(comment?comment.image:post.image);
 
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
  const updateCurrentPost =async() =>{
    let Url;
    if (selectedImage!=post.image) {
      const body = new FormData();
      body.append("file", selectedImage);
      try {
        Url = await uploadImage(body)
      } catch (error) {
        console.error("Failed to upload image!");
      }
    }
    
    if(selectedImage!=post.image && input!=post.text){
      const response = await updatePost({ _id: post._id,text:input, image: Url });
      console.log(response);
    }
    else if(selectedImage!=post.image){
      await updatePost({ _id: post._id, image: Url });
    }
    else{
      await updatePost({ _id: post._id, text: input });
    }

    posts?.map(async(cur_post)=>{
      if(cur_post?.postId===post?._id){
        if(selectedImage!=post.image && input!=post.text){
          await updatePost({ _id: cur_post._id,text:input, image: Url });
        }
        else if(selectedImage!=post.image){
          await updatePost({ _id: cur_post._id, image: Url });
        }
        else{
          await updatePost({ _id: cur_post._id, text: input });
        }
      }
    })

    onUpdate()
    onClose();

  }
  const updateCurrentComment = async() =>{
    let Url;
    if (selectedImage!=comment.image) {
      const body = new FormData();
      body.append("file", selectedImage);
      try {
        Url = await uploadImage(body)
      } catch (error) {
        console.error("Failed to upload image!");
      }
    }
    if(selectedImage!=comment.image && input!=comment.text){
      if(commentId)
        await updateReply({ postId: post._id, commentId, replyId:comment._id, updateData:{text:input, image: Url }});
      else 
        await updateComment({ _id: post._id, commentId: comment._id, updateData:{text:input, image: Url }});
    }
    else if(selectedImage!=comment.image){
      if(commentId)
        await updateReply({ postId: post._id, commentId, replyId:comment._id, updateData:{image: Url }});
      else
        await updateComment({ _id: post._id, commentId: comment._id, updateData:{image: Url }});
    }
    else{
      if(commentId)
        await updateReply({ postId: post._id, commentId, replyId:comment._id, updateData:{text:input}});
      else
        await updateComment({  _id: post._id, commentId: comment._id, updateData:{ text: input }});
    }
    onUpdate();
    onClose();
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
              <h3>{user?.name}<span className={styles["username"]}>@{user?.username}</span></h3>
    
              <h4 className={styles["timestamp"]}>
                . <Moment fromNow>{comment?.timestamp}</Moment>
              </h4>
            </div>
            
          </div>

          <div className={styles["comment-user"]}></div>

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

              {comment && <button
                className={styles["reply-btn"]}
                disabled={(!input.trim() && !selectedFile) || 
                  (comment?.text==input && comment?.image==selectedImage)}
                onClick={updateCurrentComment}
                >
                  Update
                </button>
              }
              
              {comment==null && <button
                className={styles["reply-btn"]}
                disabled={(!input.trim() && !selectedFile) || 
                  (post?.text==input && post?.image==selectedImage)}
                onClick={updateCurrentPost}
              >
                Update
              </button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("update-modal")
  );
};

export default UpdateModal;