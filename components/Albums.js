import Album from "./Album";
import Loader from "./Loader";
import { IoPause, IoPlay } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { playingAlbumsState, playState } from "../atoms/playerAtoms";

function Albums({ albums, loading, error }) {
  const [play, setPlay] = useRecoilState(playState);
  const [playingAlbums, setPlayingAlbums] = useRecoilState(playingAlbumsState);

  const handlePlay = () => {
    chooseAlbum(albums);
    if (albums.url === playingAlbums.url) {
      setPlay(!play);
    }
  };
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error :(</p>;
  }
  return (
    <div className="grid h-full grid-cols-2 p-4 py-4 overflow-scroll scrollbar-hide lg:grid-cols-4 gap-x-4 gap-y-8">
      {albums &&
        albums.map((album) => (
          <a key={album.id} href={`/album/${album.id}`}>
            <Album album={album} />
          </a>
        ))}
      <div className="absolute bottom-10 inset-x-0 ml-4 flex items-center space-x-3.5">
        <div
          className="h-10 w-10 bg-[#42cbcf] rounded-full flex items-center justify-center
        group-hover:bg-[#42cbcf] flex-shrink-0"
          onClick={handlePlay}
        >
          {albums === playingAlbums.url && play ? (
            <IoPause className="text-xl" />
          ) : (
            <IoPlay className="text-l ml-[1px]" />
          )}
        </div>
        <div className="text-[15px] ">
          <h4 className="uppercase rounded-full">{albums.name}</h4>
        </div>
      </div>
    </div>
  );
}

export default Albums;
