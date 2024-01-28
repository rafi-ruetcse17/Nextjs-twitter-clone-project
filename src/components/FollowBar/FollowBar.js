import React, { useEffect, useState } from "react";
import styles from "./FollowBar.module.css";
import { FiSearch } from "react-icons/fi";
import { getAllUsers } from "@/libs/actions/userAction";
import User from "../User/User";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const FollowBar = ({user}) => {
  console.log(user);
  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  //const Users = useSelector((state) => state.users);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUsers();
      //dispatch({ type: "SET_USERS", payload: data });
      const userMatch = data.find((check_user) => user?._id === check_user._id);
      setCurrentUser(userMatch);
      setUsers(data);
    };
    fetchData();
    //if (Users) setUsers(Users);
  }, []);

  
  const filteredUsers = users
    ?.filter((check_user) => !currentUser?.following?.includes(check_user?._id))
    .slice(0, 5);

  return (
    <div className={styles["container"]}>
      <div className={styles["search-bar"]}>
        <FiSearch />
        <input
          className={styles["search-input"]}
          type="text"
          placeholder="Search Twitter"
        />
      </div>

      <div className={styles["follow-bar"]}>
        <h2>Who to follow</h2>
        {filteredUsers?.map((check_user) => (
          check_user?._id!=user?._id && 
          <div key={check_user?._id}  
          onClick={()=>router.push(`/${check_user?.username}`)}
          >
            <User user={check_user} currentUser={currentUser} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowBar;