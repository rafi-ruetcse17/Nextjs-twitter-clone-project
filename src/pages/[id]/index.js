import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Login from "@/components/Login/Login";
import { getSession } from "next-auth/react";

const index = ({ user }) => {
  if (!user) return <Login />;
  return (
    <>
      <Sidebar />
    </>
  );
};

export default index;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      user: session?.user || null,
    },
  };
}
