import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import styles from "./Conversation.module.css";
import { LuSendHorizonal } from "react-icons/lu";
import { useSocket } from "@/libs/contexts/SocketContext";
import { markMessagesSeen } from "@/libs/actions/messageAction";

export default function Conversation({
  sessionUser,
  user,
  receiver,
  conversation,
}) {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [allMessages, setAllMessages] = useState(null);
  const chatBoxRef = useRef();
  const socket = useSocket();

  useEffect(() => {
    socketInitializer();
    setAllMessages(conversation?.conversation);
    // markMessagesAsSeen();

    return () => {
      if (socket) cleanupSocketListeners();
    };
  }, [conversation?._id, socket]);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  useEffect(() => {
    markMessagesAsSeen();
    console.log(allMessages);
  
    socket?.on("marked-as-seen", ({ conversationId, messageIds }) => {
      if (conversationId === conversation?._id) {
        setAllMessages((prev) => {
          const updatedMessages = prev.map((message) => {
            if (!message.seen) {
              return {
                ...message,
                seen: true,
              };
            }
            return message;
          });
          return updatedMessages;
        });
      }
      
    });

    
  }, [socket, conversation?._id, allMessages]);
  

  async function socketInitializer() {
    if (!socket) return;

    cleanupSocketListeners();
    socket.on(
      "receive-message",
      ({ sender_id, receiver_id, message, roomId , seen}) => {
        if (roomId == conversation._id)
          setAllMessages((pre) => [
            ...pre,
            { sender_id, receiver_id, message , seen},
          ]);
      }
    );

    socket.on("disconnect", function () {
      console.log("user disconnected");
    });

    socket.emit("join-room", { roomId: conversation?._id });
  }

  const markMessagesAsSeen = async () => {
    const unseenMessageIds = allMessages
      ?.filter((message) => message.sender_id === receiver._id && !message.seen)
    
    const Ids = unseenMessageIds?.map((message)=>message._id)
    console.log("ids", unseenMessageIds, Ids);

    //await markMessagesSeen({conversationId: conversation?._id, messageIds:unseenMessageIds});
    //socket?.emit("mark-as-seen", {conversationId: conversation?._id, messageIds:unseenMessageIds})
  };

  function cleanupSocketListeners() {
    socket.off("receive-message");
    socket.off("send-message");
    socket.off("disconnect");
    socket.off("join-room");
  }

  function handleSubmit() {
    const sender_id = user?._id;
    const receiver_id = receiver?._id;
    //console.log(user, receiver);

    socket.emit("send-message", {
      conversation: conversation?._id,
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
          {allMessages?.map((message, index) => (
            <div className={styles["conversation"]} key={index}>
              <div
                className={
                  styles[
                    message?.sender_id === receiver?._id
                      ? "receive-message"
                      : "send-message"
                  ]
                }
              >
                {message?.message}
              </div>
              {message?.seen && <div> seen</div>}
            </div>
          ))}
        </div>

        <div className={styles["send-btn"]}>
          <input
            className={styles["input"]}
            name="message"
            placeholder="enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete={"off"}
          />
          <button
            className={styles["btn"]}
            onClick={() => handleSubmit()}
            disabled={!message}
          >
            <LuSendHorizonal />
          </button>
        </div>
      </div>
    </section>
  );
}
