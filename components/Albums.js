import Album from "./Album";
import Loader from "./Loader";

function Albums({ albums, loading, error }) {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error :(</p>;
  }
  return (
    <div className="grid w-screen grid-cols-2 p-4 py-4 m-5 overflow-scroll scrollbar-hide lg:grid-cols-4 gap-x-4 gap-y-8">
      {albums &&
        albums.map((album) => (
          <a key={album.id} href={`/album/${album.id}`}>
            <Album album={album} />
          </a>
        ))}
    </div>
  );
}

export default Albums;
