import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Feed from "../Feed/Feed";
import styles from "./HomePage.module.css"
import FollowBar from "../FollowBar/FollowBar";

const HomePage = ({sessionUser, user }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!sessionUser) {
        await router.push("/");
      }
      setLoading(false);
    };

    fetchData();
  }, [sessionUser, router]);

  return (
    <div>
      {loading ? (
        <p className={styles["loading"]}>Loading...</p>
      ) : (
        <main className={styles["main"]}>
          <Sidebar sessionUser={sessionUser} user={user}/>
          <div className={styles["feed"]}>
            <Feed sessionUser={sessionUser} user={user} />
            <FollowBar sessionUser={sessionUser} user={user} />
          </div>
        </main>
      )}
    </div>
  );
};

export default HomePage;
