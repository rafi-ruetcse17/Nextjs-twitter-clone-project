import Chat from "@/components/Chat/Chat";
import { getUser, getUserById } from "@/libs/services/user-service";
import { getSession } from "next-auth/react";
import styles from "@/styles/Home.module.css";
import React, { useEffect } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useRouter } from "next/router";
import MessageUsers from "@/components/MessageUsers/MessageUsers";
import { getChat } from "@/libs/services/messageService";

const Message = ({ sessionUser, user, receiver, chat }) => {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!sessionUser) {
        await router.push("/");
      }
    };

    fetchData();
  }, [sessionUser, router]);

  if (!sessionUser) return <div>loading...</div>;
  return (
    <div>
      <main className={styles["main"]}>
        <Sidebar
          sessionUser={sessionUser}
          user={user}
          chat={chat}
        />
        <div className={styles["feed"]}>
          <MessageUsers
            sessionUser={sessionUser}
            user={user}
            chat={chat}
          />
          <Chat
            sessionUser={sessionUser}
            user={user}
            receiver={receiver}
            chat={chat}
          />
        </div>
      </main>
    </div>
  );
};

export default Message;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const response = await getUser({ username: session?.user?.username });
  const chat = await getChat(context?.params);

  let receiver_id;
  if (session?.user?._id === chat?.userOne)
    receiver_id = chat?.userTwo;
  else receiver_id = chat?.userOne;
  const receiver = await getUserById(receiver_id);

  return {
    props: {
      sessionUser: session?.user || null,
      user: JSON.parse(JSON.stringify(response)),
      receiver: JSON.parse(JSON.stringify(receiver)),
      chat: JSON.parse(JSON.stringify(chat)),
    },
  };
}
