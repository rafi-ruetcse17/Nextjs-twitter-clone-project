// import React from "react";
// import Sidebar from "@/components/Sidebar/Sidebar";
// import Login from "@/components/Login/Login";
// import { getSession } from "next-auth/react";

// const index = ({ user }) => {
//   if (!user) return <Login />;
//   return (
//     <>
//       <Sidebar />
//     </>
//   );
// };

// export default index;

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   return {
//     props: {
//       user: session?.user || null,
//     },
//   };
// }


import React, { useEffect, useState } from "react";
import Feed from "@/components/Feed/Feed";
import Sidebar from "@/components/Sidebar/Sidebar";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css"
import FollowBar from "@/components/FollowBar/FollowBar";
import Profile from "@/components/Profile/Profile";

const profile = ({ user }) => {
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
        <p>Loading...</p>
      ) : (
        <main className={styles["main"]}>
          <Sidebar />
          <div className={styles["feed"]}>
            {/* <Feed user={user} /> */}
            <Profile/>
            <FollowBar/>
          </div>
        </main>
      )}
    </div>
  );
};

export default profile;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      user: session?.user || null,
    },
  };
}
