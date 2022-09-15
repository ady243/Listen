import { useEffect, useState } from "react";
import { getSession, signIn } from "next-auth/react";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Body from "../components/Body";
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";

function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (!session) {
        setLoading(false);
        signIn();
      } else {
        setLoading(false);
      }
    };
    securePage();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Sidebar />
      <Body />

      <Player />
    </>
  );
}

export default Index;
