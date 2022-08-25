import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { playingAlbumState, playState } from "../atoms/playerAtoms";
import { ImHeadphones } from "react-icons/im";

function Song({ album, chooseAlbum }) {
  const [hasLiked, setHasLiked] = useState(false);
  const [play, setPlay] = useRecoilState(playState);
  const [playingAlbum, setPlayingAlbum] = useRecoilState(playingAlbumState);

  const handlePlay = () => {
    chooseAlbum(album);

    if (album.uri === playingAlbum.url) {
      setPlay(!play);
    }
  };

  return (
    <div className="grid items-center justify-between px-4 py-2 space-x-20 transition ease-out rounded-lg cursor-default hover:bg-white/10 group">
      <div className="flex items-center">
        {album.images.map((album) => (
          // eslint-disable-next-line react/jsx-key, @next/next/no-img-element
          <img
            src={album.url}
            alt=""
            className="inset-0 object-cover w-12 h-12 mr-3 rounded-xl"
          />
        ))}

        <div>
          <h4 className="text-white text-sm font-semibold truncate w-[450px]">
            {album.name}
          </h4>
          <p className="text-[rgb(179,179,179)] text-[13px] font-semibold group-hover:text-white">
            {album.artist}
          </p>
        </div>
      </div>

      <div className="flex items-center -space-y-39 space-x-80 md:ml-auto">
        <div className="flex -space-y-38.5 space-x-80 text-sm font-semibold text-white">
          <h4 className="font-sans">{album.popularity}</h4>
        </div>
        <div className="flex items-center rounded-full border-2 border-[#262626] w-[85px] h-10 relative cursor-pointer group-hover:border-white/40">
          <AiFillHeart
            className={`text-xl ml-3 icon space-y-4 ${
              hasLiked ? "text-[hsl(0,83%,54%)]" : "text-[#868686]"
            }`}
            onClick={() => setHasLiked(!hasLiked)}
          />
          {album.url === playingAlbum.url && play ? (
            <>
              <div
                className="h-10 w-10 rounded-full border border-[hsl(193,73%,58%)] flex items-center justify-center absolute -right-0.5 bg-[#15883e] icon hover:scale-110"
                onClick={handlePlay}
              >
                <BsFillPauseFill className="text-xl text-white" />
              </div>
            </>
          ) : (
            <>
              <div
                className="h-10 w-10 rounded-full border border-white/60 flex items-center justify-center absolute -right-0.5 hover:bg-[#15883e] hover:border-[#15883e] icon hover:scale-110"
                onClick={handlePlay}
              >
                <BsFillPlayFill className="text-white text-xl ml-[1px] " />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Song;
