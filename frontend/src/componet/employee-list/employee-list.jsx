import { useEffect, useState } from "react";
import { useAuth } from "../../context-auth/AuthContext";
function Employee_List({}) {
  const { accessToken } = useAuth();
  const [recevieEmployee, setrecevieEmployee] = useState([]);
  const [recevie_employeData, setRecevie_employeData] = useState([]);

  useEffect(() => {
    const employee_list_data = async () => {
      try {
        const [employeeResponse, jobResponse] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/users/auth/admin-employ-list", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),

          fetch(
            "http://127.0.0.1:8000/api/employee/auth/employee-info-profile",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          ),
        ]);
        const ProfileData = await employeeResponse.json();
        const JobData = await jobResponse.json();
        console.log("This is Job Title Info: ", JobData);
        setrecevieEmployee(ProfileData);

        // convert object into array
        setRecevie_employeData(Array.isArray(JobData) ? JobData : [JobData]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    employee_list_data();
  }, [accessToken]);

  return (
    <>
      <div className="p-6">
        <div className="p-6">
          <h1>Employer's List</h1>
        </div>
        <div className="p-6">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Photo</th>
                <th scope="col">Full Name</th>
                <th scope="col">Department</th>
                <th scope="col">Employer ID</th>
                <th scope="col">Status</th>
              </tr>
            </thead>

            <tbody>
              {recevieEmployee.map((employee, index) => {
                const loopEmployee = recevie_employeData.find(
                  (loop) => loop.unique_id === employee.unique_id,
                );
                return (
                  <tr key={employee.unique_id}>
                    <th scope="row">{index + 1}</th>

                    <td>
                      <img
                        className="dashboard-avatar-placeholder w-20 h-20 overflow-hidden rounded-circle"
                        src={`http://127.0.0.1:8000${employee.personal_photo}`}
                        alt=""
                      />
                    </td>

                    <td>
                      {employee.first_name} {employee.last_name}{" "}
                      {employee.grandfather_name}
                    </td>

                    <td>{employee.unique_id}</td>

                    <td>{loopEmployee?.employer_status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Employee_List;
