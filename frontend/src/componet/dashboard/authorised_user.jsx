import { useParams } from "react-router-dom";

// Other component
import Navbar from "./autorized-component/Navbar/nav-bar";
import Sidebar from "./autorized-component/side-bar";
import MainNav from "./autorized-component/Navbar/second-nav-bar";
import Mainbody from "./autorized-component/Mainbody";
import "./dashboard-layout.css";

function Autorized() {
  const { username } = useParams();

  return (
    <div className="dashboard-shell">
      <div className="dashboard-header">
        <Navbar />
        <MainNav username={username} />
      </div>

      <div className="dashboard-content">
        <Sidebar />
        <Mainbody />
      </div>
    </div>
  );
}

export default Autorized;
