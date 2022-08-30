/* eslint-disable @next/next/no-img-element */
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { playingSongState, playState } from "../atoms/playerAtoms";
import Image from "next/image";

function Poster({ props }) {
  const [play, setPlay] = useRecoilState(playState);
  const [playingSong, setPlayingSong] = useRecoilState(playingSongState);
  const { album } = props;

  const image = album.images[0];

  const handlePlay = () => {
    chooseSong(song);

    if (track.url === playingSong.url) {
      setPlay(!play);
    }
    fgyh < w;
  };

  return (
    <div
      className="w-[260px] h-[360px] rounded-[50px] overflow-hidden relative text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-out group mx-auto"
      onClick={handlePlay}
    >
      <Image
        src={image.url}
        alt=""
        height={image.height}
        width={image.width}
        className="h-full w-full absolute inset-0 object-cover rounded-[50px] opacity-80 group-hover:opacity-100"
      />

      <div className="absolute bottom-10 inset-x-0 ml-4 flex items-center space-x-3.5">
        <div className="h-10 w-10 bg-[#15883e] rounded-full flex items-center justify-center group-hover:bg-[#1db954] flex-shrink-0">
          {song.url === playingSong.uri && play ? (
            <BsFillPauseFill className="text-xl text-white" />
          ) : (
            <BsFillPlayFill className="text-white text-xl ml-[1px]" />
          )}
        </div>

        <div className="text-[15px]">
          <h4 className="font-extrabold truncate w-44">{song.title}</h4>
          <h6>{song.artist}</h6>
        </div>
      </div>
    </div>
  );
}

export default Poster;
