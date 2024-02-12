import React, { useEffect, useState } from "react";
import styles from "@/components/Sidebar/Sidebar.module.css";
import { BsBell, BsBookmark, BsThreeDots, BsTwitterX } from "react-icons/bs";
import SidebarLink from "../SidebarLink/SidebarLink";
import { AiFillHome, AiOutlineInbox, AiOutlineUser } from "react-icons/ai";
import { BiHash } from "react-icons/bi";
import {HiOutlineClipboardList,HiOutlineDotsCircleHorizontal} from "react-icons/hi";
import { signOut} from "next-auth/react";
import { useRouter } from "next/router";
import { FaSignOutAlt } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getAllConversations } from "@/libs/actions/messageAction";
import { useSocket } from "@/libs/contexts/SocketContext";

const Sidebar = ({ sessionUser, user }) => {
  const router = useRouter();
  const [notifications, setNotifications] = useState(null)
  const Notifications = useSelector((state) => state.notifications)
  const dispatch = useDispatch();
  const socket = useSocket();
  //console.log(socket, notifications);
  
  useEffect(()=>{
    socketInitializer();
    //fetchConversations()
    return ()=>{
      socket?.off("notfication");
    }
  }, [user?._id, socket])

  async function socketInitializer (){
    if(!socket) return;
    //console.log(socket);
    socket?.on("notification",({lastMessage, roomId})=>{
      console.log("kjbd",lastMessage);
      if(lastMessage?.receiver_id ===user?._id){
        setNotifications(lastMessage)
      }
    } )
  }

  const fetchConversations = async()=>{
    const response = await getAllConversations();

    const unseen = response?.filter((conversation)=>{
      const message = conversation?.conversation?.at(-1);
      if(conversation?.userOne==user?._id || conversation?.userTwo==user?._id){
        return message && !message?.seen && message?.sender_id!=user?._id
      } 
      else return false;
    })
    console.log(unseen);

    dispatch({type: "SET_NOTIFICATIONS", payload: unseen});
  }

  // useEffect(()=>{
  //   const unseen = Notifications
  //     ?.filter((notification) => {
  //       return notification?.sender_id !== user?._id
  //   })
  //   setUnseenNotifications(unseen)
  //   console.log(unseenNotifications);
  // }, [user, Notifications])
  return (
    <div className={styles["container"]}>
      <div
        className={styles["sidebar-logo"]}
        onClick={() => router.push(`/home`)}
      >
        <BsTwitterX className={styles["x-color"]} />
      </div>

      <div className={styles["sidebar"]}>
        <div onClick={() => router.push(`/home`)}>
          <SidebarLink text="Home" Icon={AiFillHome} />
        </div>
        <SidebarLink text="Explore" Icon={BiHash} />
        <SidebarLink text="Notifications" Icon={BsBell} />

        <div onClick={() => router.push(`/messages`)} className={styles["relative-container"]}>
          <SidebarLink text="Messages" Icon={AiOutlineInbox} />
          {/* {Notifications?.length > 0 && ( */}
          {notifications && (
          <div className={styles["notifications"]}>?</div>
          )} 
        </div>

        <SidebarLink text="Bookmarks" Icon={BsBookmark} />
        <SidebarLink text="Lists" Icon={HiOutlineClipboardList} />
        <div onClick={() => router.push(`/${sessionUser?.username}`)}>
          <SidebarLink text="Profile" Icon={AiOutlineUser} />
        </div>
        <SidebarLink text="More" Icon={HiOutlineDotsCircleHorizontal} />
      </div>
      <button className={styles["btn"]}>Post</button>

      <div className={styles["profile-icon"]} 
      onClick={() => router.push(`/${sessionUser?.username}`)}>
        <img src={sessionUser?._id==user?._id? user?.image:sessionUser?.image} alt="" />
        <div className={styles["user"]}>
          <h4>{sessionUser?._id==user?._id? user?.name:sessionUser?.name}</h4>
          <p>@{sessionUser?._id==user?._id? user?.username:sessionUser?.username}</p>
        </div>
        <BsThreeDots className={styles["three-dots"]} />
      </div>

      <button className={styles["signout"]} onClick={signOut}>
        <span><FaSignOutAlt/></span> &nbsp; SignOut
      </button>
    </div>
  );
};

export default Sidebar;
