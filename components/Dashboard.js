import SpotifyWebApi from "spotify-web-api-node";
import Body from "./Body";
import Right from "./Right";
import Sidebar from "./Sidebar";
import Search from "./Search";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});
spotifyApi;
function Dashboard() {
  return (
    <main>
      <Sidebar />
      <Body spotifyApi={spotifyApi} />
      <Right />
      <Search />
    </main>
  );
}

export default Dashboard;
