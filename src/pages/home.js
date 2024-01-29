import React from "react";
import { getSession } from "next-auth/react";
import HomePage from "@/components/HomePage/HomePage";
import { getUser } from "@/libs/services/user-service";

const Home = ({ sessionUser, user }) => {
  console.log(user);
  return (
    <>
      <HomePage sessionUser={sessionUser} user={user} />
    </>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const response = await getUser({username:session?.user?.username})
  return {
    props: {
      sessionUser: session?.user || null,
      user: JSON.parse(JSON.stringify(response)),
    },
  };
}