import { useRouter } from "next/router";
import React from "react";
import { useSession } from "next-auth/react";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Body from "../components/Body";
import Right from "../components/Right";
import Sidebar from "../components/Sidebar";

function Index() {
  // Redirection en cas de non connexion
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("login");
    },
  });

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <main>
      <Header session={session} />
      <Sidebar />
      <Body session={session} />
      <Right />
    </main>
  );
}

export default Index;
