/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IoPause, IoPlay } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { playingAlbumState, playState } from "../atoms/playerAtoms";

function Poster({ album, chooseAlbum }) {
  const [play, setPlay] = useRecoilState(playState);
  const [playingAlbum, setPlayingAlbum] = useRecoilState(playingAlbumState);
  const handlePlay = () => {
    chooseAlbum(album);
    if (album.url === playingAlbum.url) {
      setPlay(!play);
    }
  };

  return (
    <div
      className="w-[200] h-[200] rounded-lg overflow-hidden relative text-white
    cursor-pointer hover:scale-105 hover:text-white/100 transition
     duration-200 ease-out group-mx-auto space-y-5 top-5
    "
      onClick={handlePlay}
    >
      {/*show all images*/}
      {album.images.map((album) => (
        // eslint-disable-next-line react/jsx-key, @next/next/no-img-element
        <img
          src={album.url}
          className="inset-0 object-cover w-full h-full rounded-none group-hover:opacity-100"
        />
      ))}

      <div className="absolute bottom-10 inset-x-0 ml-4 flex items-center space-x-3.5">
        <div
          className="h-10 w-10 bg-[#42cbcf] rounded-full flex items-center justify-center
        group-hover:bg-[#42cbcf] flex-shrink-0"
        >
          {album.url === playingAlbum.url && play ? (
            <IoPause className="text-xl" />
          ) : (
            <IoPlay className="text-l ml-[1px]" />
          )}
        </div>
        <div className="text-[15px] ">
          <h4 className="uppercase rounded-full">{album.name}</h4>
        </div>
      </div>
    </div>
  );
}

export default Poster;
