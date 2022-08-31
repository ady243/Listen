import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import Head from "next/head";

export default function SignIn({ providers }) {
  return (
    <>
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
          alt="Listen"
        />

        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <div>
              <button
                className="text-white py-4 px-6 rounded-full bg-[#4dbbedfa] transition duration-300 ease-out
            border border-transparent uppercase font-bold text-xl
            md:text-base tracking-wider hover:scale-105 hover:bg-inherit space-x-10"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: { providers: await getProviders() },
  };
}
