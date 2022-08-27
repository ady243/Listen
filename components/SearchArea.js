import { useAppContext } from "../src/context/state";
import { useEffect, useState } from "react";
import ListSongs from "./ListSongs";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import spotifyApi from "../src/api/spotifyApi";

function SearchArea() {
  const { session, status } = useAppContext();

  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const [searchOffset, setSearchOffset] = useState(0);
  const [searchLimit, setSearchLimit] = useState(10);
  const [searchTotal, setSearchTotal] = useState(0);
  const [searchNext, setSearchNext] = useState(null);
  const [searchPrevious, setSearchPrevious] = useState(null);

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
    <div className="search-area">
      <SearchBar search={search} setSearch={setSearch} />
      {searchSongs.length > 0 && !searchLoading && (
        <ListSongs
          songs={searchSongs}
          loading={searchLoading}
          error={searchError}
        />
      )}
      {searchSongs.length > 0 && !searchLoading && (
        <Pagination
          previous={searchPrevious}
          next={searchNext}
          searchOffset={searchOffset}
          searchLimit={searchLimit}
          setSearchOffset={setSearchOffset}
        />
      )}
    </div>
  );
}

export default SearchArea;
