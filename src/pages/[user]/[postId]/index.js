import Head from "next/head";
import Sidebar from "@/components/Sidebar/Sidebar";
import Feed from "@/components/Feed/Feed";
import React from "react";
import styles from "@/styles/Post.module.css";
import { getSession } from "next-auth/react";
import ViewPost from "@/components/ViewPost/ViewPost";
import { getPost } from "@/libs/actions/postAction";

const index = ({ user, post }) => {
  //console.log(user, post);
  return (
    <>
      <Head>
        <title>Twitter-Clone</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles["main"]}>
        <div>
            <Sidebar />
        </div>
        
        <div className={styles["feed"]}>
            <ViewPost user={user} post={post}/>
        </div>
      </div>
    </>
  );
};

export default index;

export async function getServerSideProps(context) {
  const { user } = context.params;
  //const session = await getSession(context);
  const post = await getPost(context.query.postId);
  return {
    props: {
      //user: session?.user || null,
      user,
      post,
    },
  };
}