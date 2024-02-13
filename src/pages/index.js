import { getSession } from "next-auth/react";
import AuthPage from "@/components/AuthPage/AuthPage";

export default function Home({ user }) {
  return (
    <>
      <AuthPage user={user} />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      user: session?.user || null,
    },
  };
}
