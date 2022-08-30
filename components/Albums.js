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
    <div className="grid h-full grid-cols-2 p-4 py-4 overflow-scroll m-11 scrollbar-hide lg:grid-cols-4 gap-x-4 gap-y-8">
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
        ></div>
        <div className="text-[15px] ">
          {/* <h4 className="uppercase rounded-full">{albums.name}</h4> */}
        </div>
      </div>
    </div>
  );
}

export default Albums;
