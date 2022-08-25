import Song from "./Song";
import Loader from "./Loader";

function ListSongs({ songs, loading, error }) {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {props.error.message}</div>;
  }

  if (songs.length === 0) {
    return null;
  }

  return (
    <div
      className="grid h-full grid-cols-4 px-6 ml-24 space-y-8
       text-white transition duration-200 ease-out
       bg-black md:max-w-6xl md:mr-2 hover:text-white/100
        group-mx-auto  top-1.5"
    >
      {songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  );
}

export default ListSongs;
