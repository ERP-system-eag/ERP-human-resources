import { useEffect, useState } from "react";
import { useAuth } from "../../context-auth/AuthContext";
import { Icons } from "../../assets/Icons/icons";

function Employee_List({
  setAllEmpoyers,
  setEmployeeId,
  setAllowRight,
  employeeListVersion,
}) {
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

        setAllEmpoyers(data.length);
        // console.log(data);
      } catch (error) {
        console.error("Employee list error:", error);
      }
    };
    employee_list_data();
  }, [accessToken, employeeListVersion, setAllEmpoyers]);

  return (
    <>
      <div className="p-6">
        <div className="p-6">
          <h1>Employer's List</h1>
        </div>
        <div className="p-6">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Photo</th>
                <th scope="col">Full Name</th>
                <th scope="col">Department</th>
                <th scope="col">Email</th>
                <th scope="col">Hire Date</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recevieEmployee.map((employee, index) => (
                <tr key={employee.id} style={{ cursor: "pointer" }}>
                  <th scope="row">{index + 1}</th>

                  <td>
                    <img
                      className="dashboard-avatar-placeholder w-20 h-20 overflow-hidden rounded-circle"
                      src={`http://127.0.0.1:8000${employee.personal_photo}`}
                      alt=""
                    />
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <span className="fw-semibold">
                        {employee.user.first_name} {employee.user.last_name}
                      </span>
                      <span className="text-muted small opacity-75">
                        {employee.employee_id}
                      </span>
                    </div>
                  </td>
                  <td>{employee.job_title}</td>
                  <td>{employee.email || "N/A"}</td>
                  <td>{employee.hire_date || "N/A"}</td>
                  <td>
                    {(() => {
                      const isOnWork = employee.employer_status === "On Work";
                      const statusText =
                        employee.employer_status === "Unavailabel"
                          ? "Unavailable"
                          : employee.employer_status;
                      return (
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${
                            isOnWork
                              ? "border-green-500 text-green-700 bg-green-50/50"
                              : "border-red-500 text-red-700 bg-red-50/50"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isOnWork ? "bg-green-500" : "bg-red-500"
                            }`}
                          ></span>
                          {statusText}
                        </span>
                      );
                    })()}
                  </td>
                  <td>
                    <div
                      class="dropdown"
                      className="d-flex justify-content-center align-items-center"
                    >
                      <button
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        className="btn btn-link text-secondary p-0"
                        title="Actions"
                      >
                        <Icons.three_dot className="fs-5" />
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <a
                            class="dropdown-item"
                            onClick={(e) => {
                              e.stopPropagation();
                              setAllowRight(true);
                              setEmployeeId(employee.employee_id);
                            }}
                            href="#"
                          >
                            Edit
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            Another action
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            Something else here
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
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
