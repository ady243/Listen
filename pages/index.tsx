import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Dashboard from "../components/Dashboard";
import Loader from "../components/Loader";

function index() {
  const router = useRouter();

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("auth/signin");
    },
  });
  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className="">
      <Head>
        <title>Listen - Dashboard</title>
      </Head>
      <Dashboard />
    </div>
  );
}

export default index;
