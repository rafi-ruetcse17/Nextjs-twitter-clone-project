import React, { useState } from "react";
import styles from "@/components/Input/Input.module.css";
import { AiOutlineGif, AiOutlineClose } from "react-icons/ai";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import { RiBarChart2Line } from "react-icons/ri";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useSession } from "next-auth/react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { createPost, getAllPosts, getPost, updatePost } from "@/libs/actions/postAction";
import { useDispatch } from "react-redux";
import { setPosts } from "@/libs/redux/action";

const Input = ({user}) => {
  const dispatch = useDispatch()
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setSelectedImage(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
    const username = session.user.name;
    const email = session.user.email;
    const text = input;

    let response = await createPost({ username, email, text });

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
      const Url = await res.json();
      await updatePost({ _id: response, image: Url });
    }
    const updatedPosts = await getAllPosts(user?.email);
    dispatch({ type: 'SET_POSTS', payload: updatedPosts })

    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setShowEmojis(false);
  };

  return (
    <div className={styles[!loading ? "container1" : "container2"]}>
      <div className={styles["container-element"]}>
        <div>
          <img className={styles["image"]} src={session?.user?.image} alt="" />
        </div>

        <div className={styles["post"]}>
          <textarea
            rows="2"
            placeholder="What's Happening?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {selectedFile && (
            <div className={styles["selected-file"]}>
              <div onClick={() => setSelectedFile(null)}>
                <AiOutlineClose className={styles["selected-file-icon"]} />
              </div>

              <img src={selectedFile} alt="" />
            </div>
          )}
          {/* {imageUrl && <img src={imageUrl}/>} */}

          {!loading && (
            <div className={styles["post-icons-container"]}>
              <div className={styles["post-icons"]}>
                <label htmlFor="file">
                  <BsImage className={styles["image-icon"]} />
                </label>

                <input id="file" type="file" hidden onChange={addImageToPost} />

                <div className={styles["gif-icon"]}>
                  <AiOutlineGif />
                </div>
                <RiBarChart2Line className={styles["barchart-icon"]} />
                <BsEmojiSmile
                  className={styles["emoji-icon"]}
                  onClick={() => setShowEmojis(!showEmojis)}
                />
                <IoCalendarNumberOutline />
                <HiOutlineLocationMarker />
              </div>

              <button
                className={styles["twit-button"]}
                disabled={!input.trim() && !selectedFile}
                onClick={sendPost}
              >
                Tweet
              </button>
            </div>
          )}

          {showEmojis && (
            <div className={styles["emoji-picker"]}>
              <Picker onEmojiSelect={addEmoji} data={data} theme="dark" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;