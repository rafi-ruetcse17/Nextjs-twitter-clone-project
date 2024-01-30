import React, { useEffect, useState } from "react";
import styles from "./MessageUsers.module.css";
import { TbMessagePlus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { getAllUsers } from "@/libs/actions/userAction";
import { useRouter } from "next/router";
import { createConversation } from "@/libs/actions/messageAction";

const MessageUsers = ({ sessionUser, user }) => {
  const [users, setUsers] = useState(null);
  const router = useRouter()
  const dispatch = useDispatch();
  const Users = useSelector((state) => state.users);

  useEffect(() => {
    getUsersFromDatabase();
  }, [Users]);

  const getUsersFromDatabase = async () => {
    try {
      const response = await getAllUsers();
      dispatch({ type: "SET_USERS", payload: response });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleConversation = async({receiver})=>{
    const conversation = await createConversation({sender_id:user?._id, receiver_id:receiver?._id})
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
              className={styles["user-container"]}
              onClick={() => handleConversation({receiver:user})}
            >
              <div className={styles["user-image"]}>
                <img src={user?.image} alt="" />
              </div>
              <div className={styles["message"]}>
                <div className={styles["name-section"]}>
                  <div className={styles["name"]}>{user?.name}</div>
                  <div className={styles["username"]}>@{user?.username}</div>
                </div>
              </div>
            </div>
          )
      )}
    </section>
  );
};

export default MessageUsers;
