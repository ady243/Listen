import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Right from "../components/Right";
import Sidebar from "../components/Sidebar";
import SpotifyWebApi from "spotify-web-api-node";
import ListSongs from "../components/ListSongs";
import { HiHeart } from "react-icons/hi";

// TODO: il faut exporter ça quelque part pour éviter de le déclarer dans tous les composants
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

function MyFavourites() {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("login");
    },
  });

  // on définie le state pour les sons
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // on définie le state pour la pagination
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    if (session) {
      setLoading(true);
      spotifyApi.setAccessToken(session.accessToken);
      spotifyApi
        .getMySavedTracks({
          limit: limit,
          offset: offset,
        })
        .then((data) => {
          // parcourir tous les sons et récupérer l'attribut track
          // pour récupérer les infos de l'artiste, pour comprendre fait un :
          // console.log(data.body.items);
          const songs = data.body.items.map((song) => song.track);

          setSongs(songs);
          setTotal(data.body.total);
          setNext(data.body.next);
          setPrevious(data.body.previous);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [session, offset, limit]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <main>
      <Header session={session} />
      <Sidebar />

      {/* Ici j'ai pas utilisé le Body, il faut trouver un moyen de l'utiliser partout */}
      <section className="bg-black text-white ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
        <h1 className="space-y-2 text-2xl">
          <HiHeart className="text-[rgb(255,51,51)]" /> Mes favoris
        </h1>
        {songs && songs.length > 0 ? (
          //  J'utilise le même composant que sur la page d'accueil vu que ce sont des sons aussi

          <ListSongs songs={songs} loading={loading} error={error} />
        ) : (
          <p>Aucun son enregistré</p>
        )}
      </section>
      <Right />
    </main>
  );
}

export default MyFavourites;
