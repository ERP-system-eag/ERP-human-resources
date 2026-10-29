import { useEffect, useState } from "react";
import { useAuth } from "../../context-auth/AuthContext";
import Employee_Attendance from "./employee-attendance/employee-attendace";
import Admin_Emplpoyee from "./admin-employee/admin-employee";

function Attendance() {
  const { accessToken, user, employeeProfile } = useAuth();
  const [getAllEmployees, setGetAllEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handelAllEmployee = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/employee/auth/employee/get_all_employees",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const data = await response.json();
        setGetAllEmployees(data.employee || []);
        console.log(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };
    if (accessToken) {
      handelAllEmployee();
    }
  }, [accessToken]);

  const ownInfoEmployee = employeeProfile?.employee_id;
  console.log("This is me: ", ownInfoEmployee);

  return (
    <div className="container-fluid p-4">
      {user.is_admin ? (
        <Admin_Emplpoyee
          setGetAllEmployees={setGetAllEmployees}
          getAllEmployees={getAllEmployees}
          accessToken={accessToken}
          loading={loading}
          user={user}
        />
      ) : (
        <Employee_Attendance
          setGetAllEmployees={setGetAllEmployees}
          getAllEmployees={getAllEmployees}
          accessToken={accessToken}
          loading={loading}
          ownInfoEmployee={ownInfoEmployee}
        />
      )}
    </div>
  );
}

export default Attendance;
