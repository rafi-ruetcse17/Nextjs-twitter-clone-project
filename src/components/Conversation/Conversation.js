import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "./Conversation.module.css";
import { LuSendHorizonal } from "react-icons/lu";

let socket;

export default function Conversation({ sessionUser,user,receiver,conversation }) {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [allMessages, setAllMessages] = useState(null);

  useEffect(() => {
    socketInitializer();
    setAllMessages(conversation?.conversation)
  }, [conversation?._id]);

  async function socketInitializer() {
    await fetch("/api/socket");

    socket = io();

    socket.on("receive-message", ({ sender_id, receiver_id, message}) => {
      setAllMessages((pre) => [...pre, { sender_id, receiver_id, message}]);  
    });

    socket.on("disconnect", function () {
      console.log("user disconnected");
    });

    socket.emit("join-room", { roomId: conversation._id });
  }

  function handleSubmit() {

    const sender_id = user?._id;
    const receiver_id = receiver?._id;

    socket.emit("send-message", {
      conversation:conversation._id,
      sender_id,
      receiver_id,
      message,
    });

    setMessage("");
  }

  return (
    <section className={styles["container"]}>
      <h2>{user?.name}</h2>

      <div>

        <div>{allMessages?.length}</div>

        <div className={styles["chat-box"]}>
          {allMessages?.map((message, index)=>(
            <div className={styles["conversation"]} key={index}>
              <div className={styles[message?.sender_id===receiver?._id?"receive-message":"send-message"]}>
                {message?.message}
              </div>
            </div>
          ))}
        </div>

        <div className={styles["send-btn"]}>
          <input className={styles["input"]}
            name="message"
            placeholder="enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete={"off"}
          />
          <button className={styles["btn"]} 
          onClick={()=>handleSubmit()}>
            <LuSendHorizonal />
          </button>
        </div>
      </div>
    </section>
  );
}
