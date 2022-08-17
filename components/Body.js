import { Search } from "heroicons-react";
import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Poster from "./Poster";

function Body({ spotifyApi }) {
  const { data: session } = useSession();
  const { accessToken } = session;
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // search...

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    spotifyApi.searchTracks(search).then((res) => {
      setSearchResults(
        res.body.tracks.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumurl: track.album.images[0].url,
            popularity: track.popularity,
          };
        })
      );
    });
  }, [search, accessToken]);

  console.log(searchResults);

  //New Realease...

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getNewReleases().then((res) => {
      setNewReleases(
        res.body.albums.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumurl: track.images[0].url,
            popularity: track.popularity,
          };
        })
      );
    });
  }, [accessToken]);
  console.log(newReleases);

  return (
    <section>
      <Search Search={setSearch} />
      <div
        className="grid grid-cols-2 py-4 overflow-y-scroll 
      scrollbar-hide h-96 lg:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-8"
      >
        {searchResults.length === 0
          ? newReleases.slice(0, 4).map((track) => (
              <Poster
                key={track.id}
                track={track}
                //  chooseTrack={chooseTrack}
              />
            ))
          : searchResults.slice(0, 4).map((track) => (
              <Poster
                key={track.id}
                track={track}
                //  chooseTrack={chooseTrack}
              />
            ))}
      </div>
    </section>
  );
}

export default Body;
