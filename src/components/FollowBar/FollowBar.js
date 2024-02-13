import React, { useEffect, useState } from "react";
import styles from "./FollowBar.module.css";
import { FiSearch } from "react-icons/fi";
import { getAllUsers } from "@/libs/actions/userAction";
import User from "../User/User";
import { useRouter } from "next/router";

const FollowBar = ({ user }) => {
  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUsers();
      const userMatch = data.find((check_user) => user?._id === check_user._id);
      setCurrentUser(userMatch);
      setUsers(data);
    };
    fetchData();
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
        {filteredUsers?.map(
          (check_user) =>
            check_user?._id != user?._id && (
              <div
                key={check_user?._id}
                onClick={() => router.push(`/${check_user?.username}`)}
              >
                <User user={check_user} currentUser={currentUser} />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default FollowBar;
