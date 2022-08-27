import { useAppContext } from "../../src/context/state";
import React, { useEffect, useState } from "react";
import spotifyApi from "../../src/api/spotifyApi";
import { useRouter } from "next/router";
import ListSongs from "../../components/ListSongs";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Right from "../../components/Right";

function ShowAlbum() {
  const router = useRouter();
  const { albumId } = router.query;

  const { session, status } = useAppContext();

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session) {
      setUser(session.user);
    }
  }, [session, status]);

  // get album informations
  const [album, setAlbum] = useState(null);
  const [albumLoading, setAlbumLoading] = useState(false);
  const [albumError, setAlbumError] = useState(null);

  const [imageAlbum, setImageAlbum] = useState(null);

  useEffect(() => {
    if (!user) {
      setAlbum([]);
      return;
    }
    if (session) {
      setAlbumLoading(true);
      spotifyApi.setAccessToken(session.accessToken);
      spotifyApi
        .getAlbum(albumId)
        .then((data) => {
          // console.log(data.body.images[0].url);
          setImageAlbum(data.body.images[0].url);
          setAlbum(data.body);
          setAlbumLoading(false);
        })
        .catch((error) => {
          setAlbumError(error);
          setAlbumLoading(false);
        });
    }
  }, [albumId, session, user]);

  const [tracks, setTracks] = useState(null);
  const [tracksLoading, setTracksLoading] = useState(false);
  const [tracksError, setTracksError] = useState(null);
  const [tracksTotal, setTracksTotal] = useState(0);
  const [tracksNext, setTracksNext] = useState(null);
  const [tracksPrevious, setTracksPrevious] = useState(null);
  const [tracksLimit, setTracksLimit] = useState(10);
  const [tracksOffset, setTracksOffset] = useState(0);
  const [tracksPage, setTracksPage] = useState(1);
  const [tracksPages, setTracksPages] = useState(1);

  useEffect(() => {
    if (!user) {
      setTracks([]);
      return;
    }
    if (session) {
      setTracksLoading(true);
      spotifyApi.setAccessToken(session.accessToken);
      spotifyApi
        .getAlbumTracks(albumId, {
          limit: tracksLimit,
          offset: tracksOffset,
        })
        .then((data) => {
          setTracks(data.body.items);
          setTracksTotal(data.body.total);
          setTracksNext(data.body.next);
          setTracksPrevious(data.body.previous);
          setTracksLoading(false);
        })
        .catch((error) => {
          setTracksError(error);
          setTracksLoading(false);
        });
    }
  }, [tracksLimit, tracksOffset, session, user]);

  useEffect(() => {
    if (tracksNext) {
      setTracksPage(tracksPage + 1);
    }
    if (tracksPrevious) {
      setTracksPage(tracksPage - 1);
    }
  }, [tracksNext, tracksPrevious]);

  useEffect(() => {
    if (tracksNext) {
      setTracksPages(Math.ceil(tracksTotal / tracksLimit));
    }
  }, [tracksNext, tracksTotal, tracksLimit]);

  return (
    <>
      <Header />
      <Sidebar />
      <div>
        {albumError && <div>{albumError.message}</div>}

        {!albumLoading && !albumError && album && (
          <h1 className="mt-8 text-5xl text-center text-white ">
            Album : {album.name}
          </h1>
        )}

        {/*album image */}
        {!albumLoading && !albumError && imageAlbum && (
          <div className="flex justify-center">
            <img
              className=""
              src={imageAlbum}
              alt={album.name}
              width="100"
              height="100"
            />
          </div>
        )}

        <div>
          <h2>Tracks</h2>
        </div>
        {!tracksLoading && tracks && tracks.length > 0 ? (
          <ListSongs
            songs={tracks}
            loading={tracksLoading}
            error={tracksError}
          />
        ) : (
          <p>No tracks found</p>
        )}
        {tracks && tracks.length > 0 && (
          <div>
            <p>
              Page {tracksPage} of {tracksPages}
            </p>
            <button
              onClick={() => setTracksOffset(tracksOffset - tracksLimit)}
              disabled={!tracksPrevious}
            >
              Previous
            </button>
            <button
              onClick={() => setTracksOffset(tracksOffset + tracksLimit)}
              disabled={!tracksNext}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <Right />
    </>
  );
}

export default ShowAlbum;
