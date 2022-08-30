import { IoPlay, IoPause } from "react-icons/io5";
import { useState } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { playingSongState, playState } from "../atoms/playerAtoms";
import Albums from "./Albums";

function Song({ song, chooseSong }) {
  const [play, setPlay] = useRecoilState(playState);
  const [playingSong, setPlayingSong] = useRecoilState(playingSongState);

  const handlePlay = () => {
    chooseSong(song);
    if (song.url === playingSong.url) {
      setPlay(!play);
    }
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
    <div
      className="bg-[#ddd9e0] grid h-full grid-cols-4 p-10 py-10 overflow-scroll m-5 scrollbar-hide lg:grid-cols-4 gap-x-0 gap-y-0"
      onClick={handlePlay}
    >
      {image && (
        <Image
          src={image.url}
          alt=""
          height={image.height}
          width={image.width}
          className="w-full"
        />
      )}
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold text-[rgba(72,38,173,0.44)]">
          {song.name}
        </div>
        <>
          <Albums chooseSong={chooseSong} />
        </>

        <p className="text-base text-black">
          {song.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
      {/* music player */}
      <div
        className="h-10 w-10 bg-[#42cbcf] rounded-full flex items-center justify-center
      group-hover:bg-[#42cbcf] flex-shrink-0 ml-4 -px-4"
      >
        {song.id === playingSong.url && play ? (
          <IoPause className="text-xl" />
        ) : (
          <IoPlay className="text-l ml-[1px]" />
        )}
      </div>
      {/*<div className="px-6 pt-4 pb-2">*/}
      {/*    <span*/}
      {/*        className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#photography</span>*/}
      {/*    <span*/}
      {/*        className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#travel</span>*/}
      {/*    <span*/}
      {/*        className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#winter</span>*/}
      {/*</div>*/}
    </div>
  );
}

export default Song;

//////////////

// import React from "react";
// import { IoPause, IoPlay } from "react-icons/io5";
// import { useRecoilState } from "recoil";
// import { playingAlbumState, playState } from "../atoms/playerAtoms";

// function Poster({ album, chooseAlbum }) {
//   const [play, setPlay] = useRecoilState(playState);
//   const [playingAlbum, setPlayingAlbum] = useRecoilState(playingAlbumState);
//   const handlePlay = () => {
//     chooseAlbum(album);
//     if (album.url === playingAlbum.url) {
//       setPlay(!play);
//     }
//   };

//   return (
//     <div
//       className="w-[200] h-[200] rounded-lg overflow-hidden relative text-white
//     cursor-pointer hover:scale-105 hover:text-white/100 transition
//      duration-200 ease-out group-mx-auto space-y-5 top-5
//     "
//       onClick={handlePlay}
//     >
//       {/*show all images*/}
//       {album.images.map((album) => (
//         // eslint-disable-next-line react/jsx-key, @next/next/no-img-element
//         <img
//           src={album.url}
//           className="inset-0 object-cover w-full h-full rounded-none group-hover:opacity-100"
//         />
//       ))}

//       <div className="absolute bottom-10 inset-x-0 ml-4 flex items-center space-x-3.5">
//         <div
//           className="h-10 w-10 bg-[#42cbcf] rounded-full flex items-center justify-center
//         group-hover:bg-[#42cbcf] flex-shrink-0"
//         >
//           {album.url === playingAlbum.url && play ? (
//             <IoPause className="text-xl" />
//           ) : (
//             <IoPlay className="text-l ml-[1px]" />
//           )}
//         </div>
//         <div className="text-[15px] ">
//           <h4 className="uppercase rounded-full">{album.name}</h4>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Poster;

// export default Body;
