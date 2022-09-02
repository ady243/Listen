import { useAppContext } from "../src/context/state";
import SpotifyPlayer from "react-spotify-web-playback";
import { useState, useEffect } from "react";

function Player() {
  const { session, status, songUri, setSongUri, play, setPlay } =
    useAppContext();

  useEffect(() => {
    if (status === "authenticated" && session) {
      console.log("ok");
    }
  }, [session, status, songUri, play]);

  return (
    <div className="px-20 ml-10 justify-center w-full h-15">
      {session && (
        <SpotifyPlayer token={session.accessToken} uris={songUri} play={play} />
      )}
    </div>
  );
}

export default Player;
