import Album from "./Album";

function Albums({ albums, loading, error }) {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error :(</p>;
  }
  return (
    <div className="grid grid-cols-2 p-4 py-4 overflow-scroll scrollbar-hide h-96 lg:grid-cols-4 gap-x-4 gap-y-8">
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
