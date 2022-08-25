import { useRouter } from "next/router";
import React from "react";
import { useSession } from "next-auth/react";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Body from "../components/Body";
import Right from "../components/Right";
import Sidebar from "../components/Sidebar";
import { useRecoilState } from "recoil";
import { playingAlbumState } from "../atoms/playerAtoms";

function Index() {
  // Redirection en cas de non connexion

  const [playingAlbum, setPlayingAlbum] = useRecoilState(playingAlbumState);
  const router = useRouter();
  const chooseAlbum = (track: any) => {
    setPlayingAlbum(track);
  };
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
      <Body session={session} chooseAlbum={chooseAlbum} />
      <Right />
    </main>
  );
}

export default Index;
// function setPlayingTrack(track: any) {
//   throw new Error("Function not implemented.");
// }
