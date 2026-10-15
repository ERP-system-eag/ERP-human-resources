import { data, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Other component
import Navbar from "./autorized-component/Navbar/nav-bar";
import Sidebar from "./autorized-component/side-bar";
import MainNav from "./autorized-component/Navbar/second-nav-bar";
import Mainbody from "./autorized-component/Mainbody";
import "./dashboard-layout.css";

// authorization
import { useAuth } from "../../context-auth/AuthContext";
import Right_bar from "./autorized-component/right-bar";

function Autorized() {
  const { accessToken } = useAuth();
  const { username } = useParams();
  const [employee, setEmployee] = useState("Dashboard");
  const { employeeProfile } = useAuth();

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
  const [allowRight, setAllowRight] = useState(false);

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
          <Sidebar
            employee={employee}
            jsonData={jsonData}
            setEmployee={setEmployee}
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

        <div className="">
          <Right_bar
            allowRight={allowRight}
            getEmployeeId={getEmployeeId}
            onEmployeeUpdated={handleEmployeeUpdated}
          />
        </div>
      </div>
    </div>
  );
}

export default Autorized;
