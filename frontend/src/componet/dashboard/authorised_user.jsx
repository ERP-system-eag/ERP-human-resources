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
  const { employeeProfile } = useAuth();

  // console.log("main container: ", employeeProfile);

  return (
    <div className="dashboard-shell">
      <div className="dashboard-header fixed-top z-3">
        <Navbar />
        <MainNav
          employee={employee}
          employeeProfile={employeeProfile}
          username={username}
        />
      </div>

      <div className="h-screen fixed-top d-flex z-1">
        <div>
          <Sidebar employee={employee} setEmployee={setEmployee} />
        </div>

        <div className="dashboard-content">
          <Mainbody employee={employee} setEmployee={setEmployee} />
        </div>
      </div>
    </div>
  );
}

export default Autorized;
