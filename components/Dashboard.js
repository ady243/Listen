import Body from "./Body";
import Right from "./Right";
import Sidebar from "./Sidebar";
import Search from "./Search";

const spotifyApi = new spotifyApi({});
function Dashboard() {
  return (
    <main>
      <Sidebar />
      <Body />
      <Right />
      <Search />
    </main>
  );
}

export default Dashboard;
