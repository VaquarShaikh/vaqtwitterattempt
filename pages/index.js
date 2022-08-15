import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Test from "../components/Test";
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "../components/Login";
import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { firestore } from "../firebase";
import safeJsonStringify from "safe-json-stringify";
import Modal from "../components/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Widgets from "../components/Widgets";

export default function Home({
  trendingResults,
  followResults,
  providers,
  posts,
}) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  if (!session) {
    return <Login providers={providers} />;
  }

  return (
    <div>
      <Head>
        <title>Twitter | by vaq</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <Feed posts={posts} />
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />
        {isOpen && <Modal />}
      </main>
    </div>
  );
}

function sortt(timestamp) {
  return function (a, b) {
    if (a[timestamp.seconds] < b[timestamp.seconds]) {
      return 1;
    } else {
      return -1;
    }
  };
}

export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  const posts = [];
  querySnapshot.forEach((doc) => {
    posts.push(JSON.parse(safeJsonStringify({ id: doc.id, ...doc.data() })));
  });

  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
      posts,
    },
  };
}
