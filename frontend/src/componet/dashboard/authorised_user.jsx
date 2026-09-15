import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Other component
import Navbar from "./autorized-component/Navbar/nav-bar";
import Sidebar from "./autorized-component/side-bar";
import MainNav from "./autorized-component/Navbar/second-nav-bar";
import Mainbody from "./autorized-component/Mainbody";
import "./dashboard-layout.css";

// authorization
import { useAuth } from "../../context-auth/AuthContext";

function Autorized() {
  const { username } = useParams();
  const [employee, setEmployee] = useState("Dashboard");

  return (
    <div className="dashboard-shell">
      <div className="dashboard-header">
        <Navbar />
        <MainNav employee={employee} username={username} />
      </div>

      <div className="dashboard-content">
        <Sidebar employee={employee} setEmployee={setEmployee} />
        <Mainbody employee={employee} setEmployee={setEmployee} />
      </div>
    </div>
  );
}

export default Autorized;
