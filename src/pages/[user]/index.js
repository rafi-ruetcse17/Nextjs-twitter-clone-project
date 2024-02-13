import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import FollowBar from "@/components/FollowBar/FollowBar";
import Profile from "@/components/Profile/Profile";
import { getUser } from "@/libs/services/user-service";

const ProfilePage = ({ sessionUser, user }) => {
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
        <p>Loading...</p>
      ) : (
        <main className={styles["main"]}>
          <Sidebar sessionUser={sessionUser} user={user} />
          <div className={styles["feed"]}>
            <Profile sessionUser={sessionUser} profile_user={user} />
            <FollowBar user={sessionUser} />
          </div>
        </main>
      )}
    </div>
  );
};

export default ProfilePage;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { user } = context.params;
  const response = await getUser({ username: user });

  return {
    props: {
      sessionUser: session?.user || null,
      user: JSON.parse(JSON.stringify(response)),
    },
  };
}
