import Song from "./Song";
import Loader from "./Loader";

function ListSongs({ songs, loading, error }) {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (songs.length === 0) {
    return <div className="text-blue-400">Aucun résultat</div>;
  }

  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      {songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  );
}

export default ListSongs;
