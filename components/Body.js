import SearchBar from "./SearchBar";
import SpotifyWebApi from "spotify-web-api-node";
import { useState, useEffect } from "react";
import Poster from "./Poster";
import Loader from "./Loader";

import Song from "./Song";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

function Body({ session, chooseAlbum }) {
  // On peut faire ça parce que le Body n'est visible que si le parent a la session
  // Attention: On peut faire mieux que ça, c'est juste un exemple

  const { user } = session;

  const [realases, setRealases] = useState([]);
  const [realasesLoading, setRealasesLoading] = useState(false);
  const [realasesError, setRealasesError] = useState(null);
  const [realasesOffset, setRealasesOffset] = useState(0);
  const [realasesLimit, setRealasesLimit] = useState(8);
  const [realasesTotal, setRealasesTotal] = useState(0);
  const [realasesNext, setRealasesNext] = useState(null);
  const [realasesPrevious, setRealasesPrevious] = useState(null);

  useEffect(() => {
    if (!user) {
      setRealases([]);
      return;
    }
    if (session) {
      setRealasesLoading(true);
      spotifyApi.setAccessToken(session.accessToken);
      spotifyApi
        .getNewReleases({
          limit: realasesLimit,
          offset: realasesOffset,
          country: "FR",
        })
        .then((data) => {
          console.log(data.body);
          setRealases(data.body.albums.items);
          setRealasesTotal(data.body.albums.total);
          setRealasesNext(data.body.albums.next);
          setRealasesPrevious(data.body.albums.previous);
          setRealasesLoading(false);
        })
        .catch((error) => {
          setRealasesError(error);
          setRealasesLoading(false);
        });
    }
  }, [realasesLimit, realasesOffset, session, user]);

  console.log(realases);

  //  useeffect pour la pagination
  useEffect(() => {
    if (!user) {
      setRealases([]);
      return;
    }
    if (session) {
      setRealasesLoading(true);
      spotifyApi.setAccessToken(session.accessToken);
      spotifyApi
        .getNewReleases({
          limit: realasesLimit,
          offset: realasesOffset,
          country: "FR",
        })
        .then((data) => {
          console.log(data.body);
          setRealases(data.body.albums.items);
          setRealasesTotal(data.body.albums.total);
          setRealasesNext(data.body.albums.next);
          setRealasesPrevious(data.body.albums.previous);
          setRealasesLoading(false);
        })
        .catch((error) => {
          setRealasesError(error);
          setRealasesLoading(false);
        });
    }
  }, [user, realasesLimit, session, realasesOffset]);

  //  if loading
  if (realasesLoading) {
    return <Loader />;
  }

  //  check if error
  if (realasesError) {
    return <div>Error: {realasesError.message}</div>;
  }

  return (
    <>
      <section className="bg-black ml-24 py-4 space-x-8 md:max-w-6xl  md:mr-2.5 -top-40">
        {/* Le composant barre de recherche contient aussi les résultats */}
        <SearchBar />
        <div className="grid grid-cols-2 p-4 py-4 overflow-scroll scrollbar-hide h-96 lg:grid-cols-4 gap-x-4 gap-y-8">
          {realases &&
            realases.map((release) => (
              <Poster
                key={release.id}
                album={release}
                chooseAlbum={chooseAlbum}
              />
            ))}

          {/* {realases &&
            realases.map((release) => (
              <SearchBar
                key={release.id}
                album={release}
                chooseAlbum={chooseAlbum}
              />
            ))} */}
          {/*  pagination  */}
          {/* <div className="flex items-center justify-start space-x-2"> */}
          {/* {realasesPrevious && ( */}
          {/* <button */}
          {/* onClick={() => */}
          {/* setRealasesOffset(realasesOffset - realasesLimit) */}
          {/* } */}
          {/* > */}
          {/* <IoIosArrowBack className="text-3xl text-blue-300" /> */}
          {/* </button> */}
          {/* )} */}
          {/* {realasesNext && ( */}
          {/* <button */}
          {/* onClick={() => */}
          {/* setRealasesOffset(realasesOffset + realasesLimit) */}
          {/* } */}
          {/* > */}
          {/* <IconNameFaAngleRight /> */}
          {/* <IoIosArrowForward className="text-3xl text-blue-300" /> */}
          {/* </button> */}
          {/* )} */}
          {/* </div> */}
        </div>

        <div className="absolute flex min-w-full ml-6 gap-x-8 md:relative">
          <div className="hidden xl:inline max-w-[270px]">
            <h2 className="mb-3 font-bold text-white ">Genres</h2>
            <div className="flex gap-x-2 gap-y-2.5 flex-wrap mb-3">
              <div className="genre bg-[#42cbcf] text-black animate-bounce">
                House
              </div>
              <div className="genre bg-[rgb(219,36,222)] ">Minimal</div>
              <div className="genre animate-bounce">Hip-hop</div>
              <div className="genre bg-[#f1f1f1] text-black animate-none">
                Electronic
              </div>
              <div className="genre bg-[rgb(25,255,109)] text-black animate-bounce">
                Chillout
              </div>
            </div>
            <button className="btn">All Genres</button>
          </div>
          {/*Albums */}
          <div>
            <h2 className="mb-3 font-bold text-white ">
              {realasesTotal.length === 0 ? "New Relaeses" : "Albums"}
            </h2>
            <div
              className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D]
            overflow-thumb-rounded hover:scrollbar-thumb-gray-500 w-[830px] "
            >
              {realases.slice(4, Song.length) &&
                realases.map((release) => (
                  <Song
                    key={release.id}
                    album={release}
                    chooseAlbum={chooseAlbum}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Body;
