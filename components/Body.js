import { useAppContext } from "../src/context/state";
import { useEffect, useState } from "react";
import SearchArea from "./SearchArea";
import spotifyApi from "../src/api/spotifyApi";
import Albums from "./Albums";

function Body() {
  const { session, status } = useAppContext();

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session) {
      setUser(session.user);
    }
  }, [session, status]);

  const [releases, setReleases] = useState(null);
  const [releasesLoading, setReleasesLoading] = useState(false);
  const [releasesError, setReleasesError] = useState(null);
  const [releasesTotal, setReleasesTotal] = useState(0);
  const [releasesNext, setReleasesNext] = useState(null);
  const [releasesPrevious, setReleasesPrevious] = useState(null);
  const [releasesLimit, setReleasesLimit] = useState(10);
  const [releasesOffset, setReleasesOffset] = useState(0);
  const [releasesPage, setReleasesPage] = useState(1);
  const [releasesPages, setReleasesPages] = useState(1);

  useEffect(() => {
    if (!user) {
      setReleases([]);
      return;
    }
    if (session) {
      setReleasesLoading(true);
      spotifyApi.setAccessToken(session.accessToken);
      spotifyApi
        .getNewReleases({
          limit: releasesLimit,
          offset: releasesOffset,
          country: "FR",
        })
        .then((data) => {
          setReleases(data.body.albums.items);
          setReleasesTotal(data.body.albums.total);
          setReleasesNext(data.body.albums.next);
          setReleasesPrevious(data.body.albums.previous);
          setReleasesLoading(false);
        })
        .catch((error) => {
          setReleasesError(error);
          setReleasesLoading(false);
        });
    }
  }, [releasesLimit, releasesOffset, session, user]);

  //  useeffect pour la pagination
  useEffect(() => {
    if (!user) {
      setReleases([]);
      return;
    }
    if (session) {
      setReleasesLoading(true);
      spotifyApi.setAccessToken(session.accessToken);

      spotifyApi
        .getNewReleases({
          limit: releasesLimit,
          offset: releasesOffset,
          country: "FR",
        })
        .then((data) => {
          setReleases(data.body.albums.items);
          setReleasesTotal(data.body.albums.total);
          setReleasesNext(data.body.albums.next);
          setReleasesPrevious(data.body.albums.previous);
          setReleasesLoading(false);
        })
        .catch((error) => {
          setReleasesError(error);
          setReleasesLoading(false);
        });
    }
  }, [releasesLimit, releasesOffset, session, user]);

  const handlePageChange = (page) => {
    setReleasesPage(page);
    setReleasesOffset((page - 1) * releasesLimit);
  };

  const handleLimitChange = (limit) => {
    setReleasesLimit(limit);
    setReleasesOffset(0);
    setReleasesPage(1);
  };

  return (
    <section className="bg-black text-white ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
      <SearchArea />

      {/*<Poster/>*/}

      <div className="">
        <Albums
          albums={releases}
          loading={releasesLoading}
          error={releasesError}
          total={releasesTotal}
          next={releasesNext}
          previous={releasesPrevious}
          limit={releasesLimit}
          offset={releasesOffset}
          page={releasesPage}
          pages={releasesPages}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
      </div>
    </section>
  );
}

export default Body;

// import { useAppContext } from "../src/context/state";
// import { useEffect, useState } from "react";
// import SearchArea from "./SearchArea";
// import spotifyApi from "../src/api/spotifyApi";
// import Albums from "./Albums";

// function Body() {
//   // On peut faire ça parce que le Body n'est visible que si le parent a la session
//   // Attention: On peut faire mieux que ça, c'est juste un exemple
//   const { session, status } = useAppContext();

//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (status === "authenticated" && session) {
//       setUser(session.user);
//     }
//   }, [session, status]);

//   const [releases, setReleases] = useState(null);
//   const [releasesLoading, setReleasesLoading] = useState(false);
//   const [releasesError, setReleasesError] = useState(null);
//   const [releasesTotal, setReleasesTotal] = useState(0);
//   const [releasesNext, setReleasesNext] = useState(null);
//   const [releasesPrevious, setReleasesPrevious] = useState(null);
//   const [releasesLimit, setReleasesLimit] = useState(10);
//   const [releasesOffset, setReleasesOffset] = useState(0);
//   const [releasesPage, setReleasesPage] = useState(1);
//   const [releasesPages, setReleasesPages] = useState(1);

//   useEffect(() => {
//     if (!user) {
//       setReleases([]);
//       return;
//     }
//     if (session) {
//       setReleasesLoading(true);
//       spotifyApi.setAccessToken(session.accessToken);
//       spotifyApi
//         .getNewReleases({
//           limit: releasesLimit,
//           offset: releasesOffset,
//           country: "FR",
//         })
//         .then((data) => {
//           setReleases(data.body.albums.items);
//           setReleasesTotal(data.body.albums.total);
//           setReleasesNext(data.body.albums.next);
//           setReleasesPrevious(data.body.albums.previous);
//           setReleasesLoading(false);
//         })
//         .catch((error) => {
//           setReleasesError(error);
//           setReleasesLoading(false);
//         });
//     }
//   }, [releasesLimit, releasesOffset, session, user]);

//   //  useeffect pour la pagination
//   useEffect(() => {
//     if (!user) {
//       setReleases([]);
//       return;
//     }
//     if (session) {
//       setReleasesLoading(true);
//       spotifyApi.setAccessToken(session.accessToken);

//       spotifyApi
//         .getNewReleases({
//           limit: releasesLimit,
//           offset: releasesOffset,
//           country: "FR",
//         })
//         .then((data) => {
//           setReleases(data.body.albums.items);
//           setReleasesTotal(data.body.albums.total);
//           setReleasesNext(data.body.albums.next);
//           setReleasesPrevious(data.body.albums.previous);
//           setReleasesLoading(false);
//         })
//         .catch((error) => {
//           setReleasesError(error);
//           setReleasesLoading(false);
//         });
//     }
//   }, [releasesLimit, releasesOffset, session, user]);

//   const handlePageChange = (page) => {
//     setReleasesPage(page);
//     setReleasesOffset((page - 1) * releasesLimit);
//   };

//   const handleLimitChange = (limit) => {
//     setReleasesLimit(limit);
//     setReleasesOffset(0);
//     setReleasesPage(1);
//   };

//   //  if loading
//   // if (realasesLoading) {
//   //   return <Loader />;
//   // }

//   //  check if error
//   // if (realasesError) {
//   //   return <div>Error: {realasesError.message}</div>;
//   // }

//   return (
//     <>
//       <section className="bg-black ml-24 py-4 space-x-8 md:max-w-6xl  md:mr-2.5 -top-40">
//         {/* Le composant barre de recherche contient aussi les résultats */}
//         <SearchArea />
//         <div className="grid grid-cols-2 p-4 py-4 overflow-scroll scrollbar-hide h-96 lg:grid-cols-4 gap-x-4 gap-y-8">
//           <Albums
//             albums={releases}
//             loading={releasesLoading}
//             error={releasesError}
//             total={releasesTotal}
//             next={releasesNext}
//             previous={releasesPrevious}
//             limit={releasesLimit}
//             offset={releasesOffset}
//             page={releasesPage}
//             pages={releasesPages}
//             onPageChange={handlePageChange}
//             onLimitChange={handleLimitChange}
//           />
//         </div>

//         <div className="absolute flex min-w-full ml-6 gap-x-8 md:relative">
//           <div className="hidden xl:inline max-w-[270px]">
//             <h2 className="mb-3 font-bold text-white ">Genres</h2>
//             <div className="flex gap-x-2 gap-y-2.5 flex-wrap mb-3">
//               <div className="genre bg-[#42cbcf] text-black animate-bounce">
//                 House
//               </div>
//               <div className="genre bg-[rgb(219,36,222)] ">Minimal</div>
//               <div className="genre animate-bounce">Hip-hop</div>
//               <div className="genre bg-[#f1f1f1] text-black animate-none">
//                 Electronic
//               </div>
//               <div className="genre bg-[rgb(25,255,109)] text-black animate-bounce">
//                 Chillout
//               </div>
//             </div>
//             <button className="btn">All Genres</button>
//           </div>
//           {/*Albums */}
//           <div>
//             <h2 className="mb-3 font-bold text-white ">
//               {releasesTotal.length === 0 ? "New Relaeses" : "Albums"}
//             </h2>
//             <div
//               className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D]
//             overflow-thumb-rounded hover:scrollbar-thumb-gray-500 w-[830px] "
//             >
//               {releases &&
//                 releases.map((release) => (
//                   <Albums
//                     key={release.id}
//                     album={release}
//                     // chooseAlbum={chooseAlbum}
//                   />
//                 ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Body;
