import React, { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";
import { LuSendHorizonal } from "react-icons/lu";
import { useSocket } from "@/libs/contexts/SocketContext";
import { BsCheck2All } from "react-icons/bs";

export default function Chat({
  sessionUser,
  user,
  receiver,
  chat,
}) {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState(null);
  const chatBoxRef = useRef();
  const socket = useSocket();

  useEffect(() => {
    setAllMessages(chat?.messages);
    socketInitializer();
    markMessagesAsSeen();

    return () => {
      if (socket) cleanupSocketListeners();
    };
  }, [chat?._id, socket, user?._id]);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  useEffect(() => {
    socket?.on("marked-as-seen", ({ chatId, messageIds }) => {
      let flag = false;

      if (chatId === chat?._id) {
        setAllMessages((prev) => {
          const updatedMessages = prev.map((message) => {
            if (!message?.seen && message?.sender_id === user?._id) {
              flag = true;

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
  }, [socket, chat?._id, allMessages, user?._id]);

  async function socketInitializer() {
    if (!socket) return;

    cleanupSocketListeners();
    socket.on("receive-message", ({ lastMessage, roomId }) => {
      if (roomId == chat._id)
        setAllMessages((pre) => [...pre, lastMessage]);

      const lastMessageIsFromOtherUser =
        lastMessage?.sender_id === receiver?._id;
      let messageIds = [];
      if (allMessages) messageIds.push(lastMessage?._id);

      if (lastMessageIsFromOtherUser) {
        socket?.emit("mark-as-seen", {
          chatId: chat._id,
          messageIds,
        });
      }
    });
    socket.on("disconnect", function () {
      console.log("user disconnected");
    });

    socket.emit("join-room", { roomId: chat?._id });
  }

  const markMessagesAsSeen = async () => {
    const temp = chat?.messages;
    const unseenMessages = temp?.filter((message) => {
      return message.sender_id === receiver._id && !message.seen;
    });

    const Ids = unseenMessages?.map((message) => message._id);

    if (Ids?.length > 0) {
      socket?.emit("mark-as-seen", {
        chatId: chat?._id,
        messageIds: Ids,
      });
    }
  };

  function cleanupSocketListeners() {
    socket.off("receive-message");
    socket.off("send-message");
    socket.off("join-room");
  }

  function handleSubmit() {
    const sender_id = user?._id;
    const receiver_id = receiver?._id;

    socket.emit("send-message", {
      chatId: chat?._id,
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
          <div className={styles["receiver-name"]}>{receiver?.name}</div>
          <div>@{receiver?.username}</div>
        </div>
      </div>

      <div>
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
                {message?.seen && message?.sender_id === user?._id && (
                  <span className={styles["checked"]}>
                    {" "}
                    <BsCheck2All />
                  </span>
                )}
                {!message?.seen && message?.sender_id === user?._id && (
                  <span className={styles["check"]}>
                    {" "}
                    <BsCheck2All />
                  </span>
                )}
              </div>
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
