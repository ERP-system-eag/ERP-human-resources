import { useEffect, useState } from "react";
import { useAuth } from "../../context-auth/AuthContext";
import "../profile/profile.css";

function Right_bar_employee_info({ getEmployeeId }) {
  const { accessToken } = useAuth();
  const [employeeProfile, setEmployeeProfile] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!getEmployeeId) return;
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/employee/auth/profile/employee-detail/${getEmployeeId}/`,
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
        setEmployeeProfile(data);
      } catch (error) {
        console.error("Error fetching employee detail:", error);
      }
    };

    fetchEmployee();
  }, [getEmployeeId, accessToken]);

  if (!employeeProfile) {
    return (
      <div className="Right_dashboard-sidebar border-start border-bottom rounded-bottom-1 p-4">
        <div className="dashboard-sidebar-inner">
          <p className="text-secondary text-center">Loading employee info...</p>
        </div>
      </div>
    );
  }

  const firstName = employeeProfile.user?.first_name ?? "";
  const lastName = employeeProfile.user?.last_name ?? "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const initials = fullName
    .split(/\s+/)
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const status = employeeProfile.employer_status;
  const statusLabel = status === "Unavailabel" ? "Unavailable" : status;

  return (
    <div
      className="Right_dashboard-sidebar border-start border-bottom rounded-bottom-1"
      style={{ width: "400px", overflowY: "auto", maxHeight: "100vh" }}
    >
      <div className="dashboard-sidebar-inner p-3">
        <div className="employee-profile">
          <div className="employee-profile__cover rounded" aria-hidden="true">
            <span className="employee-profile__cover-label text-white">
              {employeeProfile.employee_id}
            </span>
          </div>
          <div className="employee-profile__body p-3">
            <div className="employee-profile__identity d-flex align-items-center gap-3">
              <div className="employee-profile__avatar_right_side z-3">
                {employeeProfile.personal_photo ? (
                  <img
                    src={`http://127.0.0.1:8000${employeeProfile.personal_photo}`}
                    alt={`${fullName || "Employee"} profile`}
                    className=""
                  />
                ) : (
                  <span>{initials || "E"}</span>
                )}
              </div>
              <div>
                <h4 className="mb-1">{fullName || "Employee"}</h4>
                <p className="text-muted mb-1">{employeeProfile.job_title}</p>
                {statusLabel && (
                  <span
                    className={`employee-profile__status ${status === "On Work" ? "is-active" : "is-inactive"}`}
                  >
                    <span aria-hidden="true" />
                    {statusLabel}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span className="fw-bold">Email:</span>
                  <span>
                    {employeeProfile.email || employeeProfile.user?.email}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span className="fw-bold">Phone:</span>
                  <span>{employeeProfile.phone_number}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span className="fw-bold">Address:</span>
                  <span>{employeeProfile.Address}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span className="fw-bold">Gender:</span>
                  <span>{employeeProfile.gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span className="fw-bold">Hire Date:</span>
                  <span>{employeeProfile.hire_date}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span className="fw-bold">Salary:</span>
                  <span>${employeeProfile.salary}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Right_bar_employee_info;
