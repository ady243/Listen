import { IoPlay, IoPause } from "react-icons/io5";
import { useState, useEffect } from "react";
import Image from "next/image";

import { useAppContext } from "../src/context/state";

function Song({ song }) {
  const [playSong, setPlaySong] = useState(false);
  const { session, status, songUri, setSongUri, play, setPlay } =
    useAppContext();

  useEffect(() => {
    if (status === "authenticated" && session) {
      //on retourne rien
    }
  }, [session, status]);

  const handleChange = () => {
    setPlaySong(!playSong);

    setSongUri(song.uri);
    setPlay(playSong);
  };
  let [image] = useState(null);

  // check if image is available and define the image url
  if (
    "album" in song &&
    "images" in song.album &&
    song.album.images.length > 0
  ) {
    image = song.album.images[0];
  }

  return (
    <div className="items-center rounded  bg-[rgb(255,255,255)]  m-50 block justify-between">
      {image && (
        <Image
          src={image.url}
          alt=""
          height={image.height}
          width={image.width}
          className="w-full"
        />
      )}
      <div className="text-center text-black text-bold">
        <div className="mb-2 text-xl font-bold text-[rgba(72,38,173,0.44)] text-bold">
          {song.name}
        </div>

        <p className="text-base text-black">
          {song.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
      {/* <>
        <SpotifyPlayer
          token={session.accessToken}
          uris={song.uri}
          play={!play}
          onClick={handleChange}
        />
      </> */}

      <div
        className="h-10 bg-[#42cbcf] rounded-[10px]   justify-center
      group-hover:bg-[#42cbcf] flex-shrink-0 relative flex"
      >
        <button onClick={handleChange}>
          {playSong ? (
            <IoPause className="text-xl" />
          ) : (
            <IoPlay className="text-xl" />
          )}
        </button>
      </div>
      {/* <SpotifyPlayer token={session.accessToken} uris={song.uri} play={play} /> */}
    </div>
  );
}

export default Song;
