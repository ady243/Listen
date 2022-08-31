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
  const [releasesLimit, setReleasesLimit] = useState(16);
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
    <section className="bg-black ml-24 py-4 space-x-8 md:max-w-9xl  md:mr-2.5 -top-40 w-100 h-100 block">
      <SearchArea />
      <br></br>
      <div>
        <h1 className="flex text-[#3cc4ea] antialiased  text-bold text-2xl text-center ">
          Albums Trends
        </h1>
      </div>

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
    </section>
  );
}

export default Body;
