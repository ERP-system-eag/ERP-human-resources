import { useEffect, useState } from "react";
import { useAuth } from "../../context-auth/AuthContext";
function Employee_List({}) {
  const { accessToken } = useAuth();
  const [recevieEmployee, setrecevieEmployee] = useState([]);

  useEffect(() => {
    const employee_list_data = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/employee/auth/employer-data-list",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        setrecevieEmployee(data);
        console.log(data);
      } catch (error) {
        console.error("Employee list error:", error);
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
              {recevieEmployee.map((employee, index) => (
                <tr key={employee.id}>
                  <th scope="row">{index + 1}</th>

                  <td>
                    <img
                      className="dashboard-avatar-placeholder w-20 h-20 overflow-hidden rounded-circle"
                      src={`http://127.0.0.1:8000${employee.personal_photo}`}
                      alt=""
                    />
                  </td>
                  <td>
                    {employee.user.first_name} {employee.user.last_name}
                  </td>
                  <td>{employee.job_title}</td>
                  <td>{employee.employee_id}</td>
                  <td>{employee.employer_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Employee_List;
