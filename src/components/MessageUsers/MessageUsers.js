import React, { useEffect, useState } from "react";
import styles from "./MessageUsers.module.css";
import { TbMessagePlus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { getAllUsers } from "@/libs/actions/userAction";
import { useRouter } from "next/router";
import { createConversation } from "@/libs/actions/messageAction";
import { useSocket } from "@/libs/contexts/SocketContext";

const MessageUsers = ({ sessionUser, user, conversation }) => {
  const [users, setUsers] = useState(null);
  const [notifications, setNotifications] = useState(null)
  const router = useRouter()
  const dispatch = useDispatch();
  const socket = useSocket();
  const Users = useSelector((state) => state.users);
  const Notifications = useSelector((state) => state.notifications)
  //console.log("inf")

  useEffect(()=>{
    socketInitializer();
    //fetchConversations()
    return ()=>{
      socket?.off("notfication");
    }
  }, [user?._id, socket, conversation?._id])

  useEffect(() => {
    getUsersFromDatabase();
  }, [conversation?._id]);

  async function socketInitializer (){
    if(!socket) return;
    //console.log(socket);
    socket?.on("notification",({lastMessage, roomId})=>{
      console.log("kjbd",lastMessage);
      if(lastMessage?.receiver_id ===user?._id){
        if(!notifications)
          setNotifications([lastMessage])
        else
          setNotifications([...notifications, lastMessage])
      }
    } )
  }
  console.log(notifications);

  const getUsersFromDatabase = async () => {
    try {
      const response = await getAllUsers();
      dispatch({ type: "SET_USERS", payload: response });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleConversation = async ({ receiver }) => {
    const conversation = await createConversation({ sender_id: user?._id, receiver_id: receiver?._id })
    router.push(`/messages/${conversation._id}`)

  }
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
              className={styles[conversation?.userOne===user?._id || 
                conversation?.userTwo===user?._id? "user-container": "non-colored"]}
              onClick={() => handleConversation({ receiver: user })}
            >
              <div className={styles["user-image"]}>
                <img src={user?.image} alt="" />
                {notifications && notifications?.some(notification=>notification?.sender_id===user?._id) &&  (
                <div className={styles["notifications"]}>?</div>
                )}
              </div>
              <div className={styles["message"]}>
                <div className={styles["name-section"]}>
                  <div className={styles["name"]}>{user?.name} </div>
                  <div >@{user?.username}</div>
                  {/* {Notifications?.some(notification => notification?.sender_id === user?._id) ? (
                    <div className={styles["message-bold"]}>
                      {Notifications.find(notification => notification?.sender_id === user?._id)?.message}
                    </div>)
                    : (<div className={styles["message-light"]}> 
                    {Notifications.find(notification => notification?.sender_id === sessionUser?._id)?.message}
                    </div>
                    )} */}
                </div>
              </div>
            </div>
          )
      )}
    </section>
  );
};

export default MessageUsers;
