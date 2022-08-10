import Head from "next/head";
import React from "react";
import Dashboard from "../components/Dashboard";

function index() {
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
