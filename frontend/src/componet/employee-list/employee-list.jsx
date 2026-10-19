import { useEffect, useState } from "react";
import { useAuth } from "../../context-auth/AuthContext";
import { Icons } from "../../assets/Icons/icons";
import "../employee-list/addEmployeeStyle.css";

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

  // add new create button
  const addEmployee = () => {
    setAllowRight("createEmployee");
  };

  return (
    <>
      <div className="p-6">
        <div className="p-3 d-flex justify-content-between align-items-center">
          <div className="col-md-6">
            <div className="input-group mb-3">
              <span className="input-group-text fs-5" id="basic-addon1">
                <Icons.search />
              </span>
              <input
                type="text"
                className="form-control p-2"
                style={{ fontSize: "13px" }}
                placeholder="search employee by name, email, phone number"
              />
            </div>
          </div>

          <button
            onClick={addEmployee}
            className="col-md-2 border p-2 d-flex justify-content-center align-items-center gap-2 rounded-pill fw-bold"
            style={{ fontSize: "13px" }}
          >
            <Icons.plus />
            Add Employee
          </button>
        </div>
        <div className="table-responsive">
          <table
            className="table table-hover align-middle table-bordered"
            style={{ fontSize: "13px" }}
          >
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  ID
                </th>
                <th scope="col" className="text-center">
                  Photo
                </th>
                <th scope="col" className="text-center">
                  Full Name
                </th>
                <th scope="col" className="text-center">
                  Email
                </th>
                <th scope="col" className="text-center">
                  Joining Date
                </th>
                <th scope="col" className="text-center">
                  Status
                </th>
                <th scope="col" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="fw-bold">
              {recevieEmployee.map((employee, index) => (
                <tr key={employee.id}>
                  <th scope="row" className="text-center">
                    {index + 1}
                  </th>

                  <td className="text-center">
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        className="dashboard-avatar-placeholder w-20 h-20 overflow-hidden rounded-circle"
                        src={`http://127.0.0.1:8000${employee.personal_photo}`}
                        alt=""
                      />
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="d-flex flex-column align-items-center">
                      <span className="fw-semibold">
                        {employee.user.first_name} {employee.user.last_name}
                      </span>
                      <span className="text-muted small opacity-75">
                        {employee.job_title || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="">
                    <div className="d-flex flex-column align-items-center">
                      <span>{employee.email || "N/A"}</span>
                      <span className="text-muted small opacity-75">
                        {employee.employee_id}
                      </span>
                    </div>
                  </td>
                  <td className="text-center">{employee.hire_date || "N/A"}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center align-items-center">
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
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center align-items-center gap-4">
                      <button
                        className="btn btn-link IconsHoverEye p-0"
                        title="View"
                        type="button"
                      >
                        <Icons.eye />
                      </button>
                      <div className="dropdown d-flex justify-content-center align-items-center">
                        <button
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          className="btn btn-link p-0 IconsHoverEdit"
                          title="Actions"
                          type="button"
                        >
                          <Icons.edit
                            className=""
                            onClick={(e) => {
                              e.stopPropagation();
                              setAllowRight("EditBtn");
                              setEmployeeId(employee.employee_id);
                            }}
                          />
                        </button>
                      </div>
                      <button
                        className="btn btn-link IconsHoverDelete p-0"
                        title="Delete"
                        type="button"
                      >
                        <Icons.delete />
                      </button>
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
