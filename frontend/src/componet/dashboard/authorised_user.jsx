import { data, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Other component
import Sidebar from "./autorized-component/side-bar";
import MainNav from "./autorized-component/Navbar/second-nav-bar";
import Mainbody from "./autorized-component/Mainbody";
import "./dashboard-layout.css";

// authorization
import { useAuth } from "../../context-auth/AuthContext";
import Right_bar from "./autorized-component/right-bar";
import Message_container from "./autorized-component/message";

function Autorized() {
  const { accessToken } = useAuth();
  const { username } = useParams();
  const [employee, setEmployee] = useState("Dashboard");
  const { employeeProfile } = useAuth();
  const [isSidebarShrunk, setIsSidebarShrunk] = useState(false);

  // check complate profile
  const [complated, setComplated] = useState([]);

  // Count all employers
  const [allEmployers, setAllEmpoyers] = useState();

  // console.log("main container: ", employeeProfile);
  const checkAdmin = localStorage.getItem("user");
  const jsonData = JSON.parse(checkAdmin);

  // get employee id
  const [getEmployeeId, setEmployeeId] = useState();
  const [employeeListVersion, setEmployeeListVersion] = useState(0);

  // Right bar hook
  const [allowRight, setAllowRight] = useState("");

  const handleEmployeeUpdated = (updatedEmployee) => {
    setEmployeeId(updatedEmployee.employee_id);
    setEmployeeListVersion((version) => version + 1);
  };

  // check employer fill all Employees_data complately
  useEffect(() => {
    const ComplateProfile = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/employee/auth/employee-info-profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        const data = await response.json();

        setComplated(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (accessToken) {
      ComplateProfile();
    }
  }, [accessToken]);

  // employe_data usestate
  const [employeData, setemployeData] = useState([]);
  useEffect(() => {
    const employe_data = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/users/auth/employer-info/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const data = await response.json();
        setemployeData(data);
      } catch (error) {
        // console.error(error);
      }
    };

    if (accessToken) {
      employe_data();
    }
  }, [accessToken]);

  const letComplateProfile =
    employeeProfile &&
    (!employeeProfile.date_Of_Birth ||
      !employeeProfile.emergency_contact ||
      !employeeProfile.employee_id ||
      !employeeProfile.phone_number);
  return (
    <div
      className="dashboard-shell"
      style={{
        gridTemplateColumns: isSidebarShrunk
          ? "70px 1fr 360px"
          : "260px 1fr 360px",
        transition: "grid-template-columns 0.3s ease",
      }}
    >
      <div className="z-3">
        <Sidebar
          employee={employee}
          jsonData={jsonData}
          employeeProfile={employeeProfile}
          username={username}
          setEmployee={setEmployee}
          isShrunk={isSidebarShrunk}
          setIsShrunk={setIsSidebarShrunk}
        />
      </div>

      <div className="h-screen z-2 d-flex">
        <div
          className="dashboard-header fixed-top"
          style={{
            left: isSidebarShrunk ? "70px" : "260px",
            right: "360px",
            transition: "left 0.3s ease",
          }}
        >
          <MainNav
            employee={employee}
            employeeProfile={employeeProfile}
            username={username}
          />
        </div>

        <div className="dashboard-content">
          <Mainbody
            employee={employee}
            jsonData={jsonData}
            setEmployee={setEmployee}
            employeeProfile={employeeProfile}
            // profile check
            letComplateProfile={letComplateProfile}
            employeData={employeData}
            // profile - employee complate
            complated={complated}
            // count employers
            setAllEmpoyers={setAllEmpoyers}
            allEmployers={allEmployers}
            setEmployeeId={setEmployeeId}
            setAllowRight={setAllowRight}
            employeeListVersion={employeeListVersion}
          />
        </div>
      </div>
      <div className="right-grid">
        <div className="right-grid-message d-flex justify-content-center align-items-center">
          <Message_container />
        </div>
        <Right_bar
          allowRight={allowRight}
          getEmployeeId={getEmployeeId}
          onEmployeeUpdated={handleEmployeeUpdated}
        />
      </div>
    </div>
  );
}

export default Autorized;
