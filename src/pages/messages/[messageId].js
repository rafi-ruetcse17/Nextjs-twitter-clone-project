import Conversation from "@/components/Conversation/Conversation";
import { getUser } from "@/libs/services/user-service";
import { getSession } from "next-auth/react";
import styles from "@/styles/Home.module.css";
import React, { useEffect } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useRouter } from "next/router";
import MessageUsers from "@/components/MessageUsers/MessageUsers";

const message = ({ sessionUser, user }) => {
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      if (!sessionUser) {
        await router.push("/");
      }
    };

    fetchData();
  }, [sessionUser, router]);
  return (
    <div>
      <main className={styles["main"]}>
        <Sidebar sessionUser={sessionUser} user={user} />
        <div className={styles["feed"]}>
          <MessageUsers sessionUser={sessionUser} user={user}/>
          <Conversation sessionUser={sessionUser} user={user} />
        </div>
      </main>
    </div>
  );
};

export default message;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const response = await getUser({ username: session?.user?.username });
  return {
    props: {
      sessionUser: session?.user || null,
      user: JSON.parse(JSON.stringify(response)),
    },
  };
}
