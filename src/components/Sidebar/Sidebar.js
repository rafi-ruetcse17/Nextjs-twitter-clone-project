import React from "react";
import styles from "@/components/Sidebar/Sidebar.module.css";
import { BsBell, BsBookmark, BsThreeDots, BsTwitterX } from "react-icons/bs";
import SidebarLink from "../SidebarLink/SidebarLink";
import { AiFillHome, AiOutlineInbox, AiOutlineUser } from "react-icons/ai";
import { BiHash } from "react-icons/bi";
import {
  HiOutlineClipboardList,
  HiOutlineDotsCircleHorizontal,
} from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Sidebar = () => {
  const { data: session } = useSession();
  const router = useRouter()
  return (
    <div className={styles["container"]}>
      <div className={styles["sidebar-logo"]}>
        <BsTwitterX className={styles["x-color"]} />
      </div>
      <div className={styles["sidebar"]}>
        <div onClick={()=>router.push(`/home`)}>
          <SidebarLink text="Home" Icon={AiFillHome} />
        </div>
        <SidebarLink text="Explore" Icon={BiHash} />
        <SidebarLink text="Notifications" Icon={BsBell} />
        <SidebarLink text="Messages" Icon={AiOutlineInbox} />
        <SidebarLink text="Bookmarks" Icon={BsBookmark} />
        <SidebarLink text="Lists" Icon={HiOutlineClipboardList} />
        <div onClick={()=>router.push(`/${session?.user?.username}`)}>
          <SidebarLink text="Profile" Icon={AiOutlineUser} />
        </div>
        <SidebarLink text="More" Icon={HiOutlineDotsCircleHorizontal} />
      </div>
      <button className={styles["btn"]}>Post</button>

      <div className={styles["profile-icon"]} onClick={signOut}>
        <img src={session?.user?.image} alt="" />
        <div className={styles["user"]}>
          <h4>{session?.user?.name}</h4>
          <p>@{session?.user?.username}</p>
        </div>
        <BsThreeDots className={styles["three-dots"]} />
      </div>
    </div>
  );
};

export default Sidebar;
