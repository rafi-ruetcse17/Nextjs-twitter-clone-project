import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { FcApproval } from "react-icons/fc";

const redirecting = ({ tokenId, user }) => {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const status = await signIn("credentials", {
        verificationToken: tokenId,
        redirect: false,
      });

      if (status.ok || user) router.push("/home");
    };

    fetchData();
  }, [user, router]);

  return (
    <div className={styles["loading"]}>
      <FcApproval/> Verification Successfull.redirecting...
    </div>
  );
};

export default redirecting;

export async function getServerSideProps(context) {
  const { tokenId } = context.params;
  const session = await getSession(context);
  return {
    props: {
      tokenId,
      user: session?.user || null,
    },
  };
}
