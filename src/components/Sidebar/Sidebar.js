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
import { getAllConversations } from "@/libs/actions/messageAction";
import { useSocket } from "@/libs/contexts/SocketContext";

const Sidebar = ({ sessionUser, user , conversation}) => {
  const router = useRouter();
  const [notifications, setNotifications] = useState([])
  const socket = useSocket();
 
  
  useEffect(() => {
    fetchConversations();
  }, [conversation?._id]);

  useEffect(()=>{
    socketInitializer();
    markMessagesSeen()
    return ()=>{
      socket?.off("notfication");
    }
  }, [user?._id, socket, conversation?._id])

  

  async function socketInitializer (){   
    if(!socket) return;

    socket?.on("notification",(chat)=>{
      if(chat?.conversation?.at(-1)?.receiver_id ===user?._id){
        if(notifications?.some(notification=>notification?._id===chat?._id)){
          console.log("no change"); 
        }
        else setNotifications(prevNotifications => [...prevNotifications, chat]); 
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
    setNotifications(unseen)
  }

  const markMessagesSeen = async ()=>{
    socket?.on("marked-as-seen", ({ conversationId, messageIds }) => {
      const unseen = notifications?.filter(notification=>notification?._id!=conversationId)
      setNotifications(unseen)
    });
  }
 
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
          {notifications?.length>0 && (
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
