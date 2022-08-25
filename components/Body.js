import SearchBar from "./SearchBar";
import SpotifyWebApi from "spotify-web-api-node";
import { useState, useEffect } from "react";
import Poster from "./Poster";
import Loader from "./Loader";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

function Body({ session }) {
  // On peut faire ça parce que le Body n'est visible que si le parent a la session
  // Attention: On peut faire mieux que ça, c'est juste un exemple

  const { user } = session;

  const [realases, setRealases] = useState([]);
  const [realasesLoading, setRealasesLoading] = useState(false);
  const [realasesError, setRealasesError] = useState(null);
  const [realasesOffset, setRealasesOffset] = useState(0);
  const [realasesLimit, setRealasesLimit] = useState(4);
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
      <SearchBar />
      <section className="bg-black text-white ml-24 py-6 space-x-5 md:max-w-6xl  md:mr-1.5 h-full">
        {/* Le composant barre de recherche contient aussi les résultats */}

        <div className="grid w-full py-2 overflow-y-scroll scrollbar-hide h-96 lg:grid-cols-2 xl:grid-cols-4 gap-x-1 gap-y-8">
          {realases &&
            realases.map((release) => (
              <Poster key={release.id} album={release} />
            ))}
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
      </section>
    </>
  );
}

export default Body;
