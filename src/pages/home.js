import React, { useEffect, useState } from "react";
import Feed from "@/components/Feed/Feed";
import Sidebar from "@/components/Sidebar/Sidebar";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import FollowBar from "@/components/FollowBar/FollowBar";

const Home = ({ user }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        await router.push("/");
      }
      setLoading(false);
    };

    fetchData();
  }, [user, router]);

  return (
    <div>
      {loading ? (
        <p className={styles["loading"]}>Loading...</p>
      ) : (
        <main className={styles["main"]}>
          <Sidebar />
          <div className={styles["feed"]}>
            <Feed user={user} />
            <FollowBar user={user}/>
          </div>
        </main>
      )}
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      user: session?.user || null,
    },
  };
}
