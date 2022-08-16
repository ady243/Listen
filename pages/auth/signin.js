import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Loader from "../../components/Loader";
import { useRouter } from "next/router";
import { getProviders, useSession, signIn, signOut } from "next-auth/react";

function SignInUser() {
  const { data: session } = useSession();
  const router = useRouter();
  // if session
  if (session) {
    return (
      <>
        <div>
          <h1>Vous êtes connecté</h1>
          <button onClick={() => signOut()}>Se déconnecter</button>
        </div>
      </>
    );
  }
  
  // Si user connecté on redirige vers la page d'accueil
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  // Il faut récupérer les providers après
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

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

      {/* liste des providers configurés */}
      {providers &&
        Object.values(providers).map((provider) => (
          // Btn pour chaque provider
          <div key={provider.id}>
            <button
              className="text-white py-4 px-6 rounded-full bg-[#4dbbedfa] transition duration-300 ease-out
      border border-transparent uppercase font-bold text-xl
       md:text-base tracking-wider hover:scale-105 hover:bg-inherit"
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
            <div className="w-full h-px bg-white opacity-25 my-4"></div>
          </div>
        ))}
    </div>
  );
}

export default SignInUser;
