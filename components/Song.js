function Song({ song }) {
  return (
    <div className="block w-56 p-6 mx-2 bg-white rounded-lg shadow-lg">
      <h5 className="mb-2 text-xl font-medium leading-tight text-gray-900">
        {song.name}
      </h5>
      <p className="mb-4 text-base text-gray-700">
        <h3>{song.name}</h3>
        <p>{song.artists.map((artist) => artist.name).join(", ")}</p>
        <p>{song.album.name}</p>
      </p>
      <button
        type="button"
        className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Ecouter
      </button>
    </div>
  );
}

export default Song;
