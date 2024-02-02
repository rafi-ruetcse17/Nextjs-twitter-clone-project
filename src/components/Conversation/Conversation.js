import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import styles from "./Conversation.module.css";
import { LuSendHorizonal } from "react-icons/lu";
import { useSocket } from "@/libs/contexts/SocketContext";


export default function Conversation({ sessionUser,user,receiver,conversation }) {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [allMessages, setAllMessages] = useState(null);
  const chatBoxRef = useRef();
  const socket = useSocket()
  console.log(socket);

  useEffect(() => {
    socketInitializer();
    setAllMessages(conversation?.conversation)

    return ()=>{
      socket?.on("disconnect", function () {
        console.log("user disconnected");
      });
    }
  }, [conversation,socket]);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  async function socketInitializer() {
    // await fetch("/api/socket");

    // socket = io();
    // console.log(socket);
    if(!socket)
      return;

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

  function scrollToBottom() {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }


  return (
    <section className={styles["container"]}>
      <div className={styles["receiver-container"]}>
        <div className={styles["receiver"]}>
          <img src={receiver?.image} />
          <div className={styles["receiver-name"]}>{user?.name}</div>
          <div>@{receiver?.username}</div>
        </div>
      </div>

      <div>

        {/* <div>{allMessages?.length}</div> */}

        <div className={styles["chat-box"]} ref={chatBoxRef}>
          {allMessages?.map((message, index)=>( 
            <div className={styles["conversation"]} key={index}>
              <div className={styles[message?.sender_id===receiver?._id?"receive-message":"send-message"]}>
                {message?.message}  
              </div>
              {/* <div>rafi</div> */}
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
          onClick={()=>handleSubmit()} disabled={!message}>
            <LuSendHorizonal />
          </button>
        </div>
      </div>
    </section>
  );
}
