import React from "react";
import Image from "next/image";
import Head from "next/dist/shared/lib/head";
import { getProviders, useSession } from "next-auth/react";

function Signin(providers) {
  const { data: session } = useSession("");

  return (
    <div className="flex flex-col items-center h-screen space-y-0 bg-black pt-25">
      <Head>
        <title>Login - Listen</title>
      </Head>
      <Image
        src="https://zupimages.net/up/22/33/bdef.jpeg"
        width={355}
        height={600}
        top={400}
        objectFit="contain"
        className="animate-pulse"
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.id}></div>
      ))}

      <button
        className="text-white py-4 px-6 rounded-full bg-[#4dbbedfa] transition duration-300 ease-out
      border border-transparent uppercase font-bold text-xl
       md:text-base tracking-wider hover:scale-105 hover:bg-inherit"
        onClick={() => signIn(providers.id)}
      >
        Sign in with spotify
      </button>
      <h1 className="text-white">OR</h1>
      <button
        className="text-white py-4 px-6 rounded-full bg-[#4dbbedfa] transition duration-300 ease-out
      border border-transparent uppercase font-bold text-xl md:text-base tracking-wider hover:scale-105 hover:bg-inherit"
      >
        Create a new account
      </button>
    </div>
  );
}

export default Signin;

export async function getServerSidePrps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}