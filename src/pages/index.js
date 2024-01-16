import Head from 'next/head'
import { useSession } from 'next-auth/react'
import Login from '@/components/Login/Login'
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar/Sidebar'
import Feed from '@/components/Feed/Feed'
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'


export default function Home({user}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await router.push('/home');
      }
      setLoading(false);
    };

    fetchData();
  }, [user, router]);
  //if(!user) return <Login user={user}/>
  if(loading)
    return <div>loading...</div>

  return (
    <>
      <Head>
      <title>Twitter-Clone</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Login/>
      {/* <main className={styles["main"]}>
        <Sidebar/>
        <div className={styles["feed"]}>
          <Feed user={user}/>
        </div>
      </main> */}
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      user: session?.user || null,
    },
  };
}