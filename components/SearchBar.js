import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { useSession } from "next-auth/react";
import ListSongs from "./ListSongs";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

function SearchBar() {
  // on définie la session
  const { data: session } = useSession();

  // on définie le state pour la recherche
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const [searchOffset, setSearchOffset] = useState(0);
  const [searchLimit, setSearchLimit] = useState(10);
  const [searchTotal, setSearchTotal] = useState(0);
  const [searchNext, setSearchNext] = useState(null);
  const [searchPrevious, setSearchPrevious] = useState(null);
  // on définie le state pour la recherche par artiste si tu en as besoin au cas ou
  const [searchSongs, setSearchSongs] = useState([]);

  useEffect(() => {
    if (!search) {
      setSearchSongs([]);
      return;
    }
    if (session) {
      setSearchLoading(true);
      spotifyApi.setAccessToken(session.accessToken);
      spotifyApi
        .searchTracks(search, {
          limit: searchLimit,
          offset: searchOffset,
        })
        .then((data) => {
          // on récupère les données de la recherche
          setSearchSongs(data.body.tracks.items);
          setSearchTotal(data.body.tracks.total);
          setSearchNext(data.body.tracks.next);
          setSearchPrevious(data.body.tracks.previous);
          setSearchLoading(false);
        })
        .catch((error) => {
          setSearchError(error);
          setSearchLoading(false);
        });
    }
  }, [session, search, searchOffset, searchLimit]);

  return (
    <>
      <div
        className="absolute inset-x-3 -top-20 max-w-[1150px]
       bg-[#dadada] rounded-full overflow-hidden border-4
       border-[#42cbcf] p-0.1 px-5 pr-10 flex items-center m-24 font-sans "
      >
        <div
          className="flex-shrink-0 w-5 h-5 border-2
        border-[#123456] rounded-full animate-bounce"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#dadada] border-none text-black lg:w-full focus:ring-0 outline-none  
        "
          placeholder="Recherche.."
        />
        {/* <button onClick={() => setSearchOffset(0)}>Search</button> */}
      </div>

      {/*  On passe le tout au composant d'affichage */}
      <ListSongs
        songs={searchSongs}
        loading={searchLoading}
        error={searchError}
      />
    </>
  );
}

export default SearchBar;
