import React, { useEffect, useState } from "react";
import styles from "./MessageUsers.module.css";
import { TbMessagePlus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { getAllUsers } from "@/libs/actions/userAction";
import { useRouter } from "next/router";
import {
  createChat,
  getAllChats,
} from "@/libs/actions/messageAction";
import { useSocket } from "@/libs/contexts/SocketContext";

const MessageUsers = ({ sessionUser, user, chat }) => {
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const socket = useSocket();
  const Users = useSelector((state) => state.users);

  useEffect(() => {
    getUsersFromDatabase();
    fetchChats();
  }, [chat?._id]);

  useEffect(() => {
    socketInitializer();
    markMessagesSeen();
    return () => {
      socket?.off("notfication");
    };
  }, [user?._id, socket, chat?._id]);

  async function socketInitializer() {
    if (!socket) return;

    socket?.on("notification", (chat) => {
      if (chat?.messages?.at(-1)?.receiver_id === user?._id) {
        if (
          !notifications?.some(
            (notification) => notification?._id === chat?._id
          )
        ) {
          setNotifications((prevNotifications) => [...prevNotifications, chat]);
        }
      }
    });
  }

  const fetchChats = async () => {
    const response = await getAllChats();

    const unseen = response?.filter((chat) => {
      const message = chat?.messages?.at(-1);
      if (
        chat?.userOne == user?._id ||
        chat?.userTwo == user?._id
      ) {
        return message && !message?.seen && message?.sender_id != user?._id;
      } else return false;
    });
    setNotifications(unseen);
  };

  const markMessagesSeen = async () => {
    socket?.on("marked-as-seen", ({ chatId, messageIds }) => {
      const unseen = notifications?.filter(
        (notification) => notification?._id != chatId
      );
      setNotifications(unseen);
    });
  };

  const getUsersFromDatabase = async () => {
    try {
      const response = await getAllUsers();
      dispatch({ type: "SET_USERS", payload: response });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChat = async ({ receiver }) => {
    const chat = await createChat({
      sender_id: user?._id,
      receiver_id: receiver?._id,
    });
    router.push(`/messages/${chat._id}`);
  };
  return (
    <section className={styles["container"]}>
      <div className={styles["home"]}>
        Messages
        <TbMessagePlus />
      </div>

      <div className={styles["search-bar"]}>
        <FiSearch />
        <input
          className={styles["search-input"]}
          type="text"
          placeholder="Search Direct Messages"
        />
      </div>

      {Users?.map(
        (user) =>
          user?._id != sessionUser?._id && (
            <div
              key={user?._id}
              className={
                styles[
                  chat?.userOne === user?._id ||
                  chat?.userTwo === user?._id
                    ? "user-container"
                    : "non-colored"
                ]
              }
              onClick={() => handleChat({ receiver: user })}
            >
              <div className={styles["user-image"]}>
                <img src={user?.image} alt="" />
                {notifications?.some(
                  (notification) =>
                    notification?.messages?.at(-1).sender_id === user?._id
                ) && <div className={styles["notifications"]}>?</div>}
              </div>
              <div className={styles["message"]}>
                <div className={styles["name-section"]}>
                  <div className={styles["name"]}>{user?.name} </div>
                  <div>@{user?.username}</div>
                </div>
              </div>
            </div>
          )
      )}
    </section>
  );
};

export default MessageUsers;
