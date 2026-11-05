import { useEffect, useState } from "react";
import { useAuth } from "../../context-auth/AuthContext";

function View_profile({ getEmployeeId }) {
  const [viewProfile, setViewProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuth();

  useEffect(() => {
    const employee_Detail = async () => {
      if (!getEmployeeId || !accessToken) return;
      setLoading(true);
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
        if (response.ok) {
          const data = await response.json();
          setViewProfile(data);
        }
      } catch (error) {
        console.error("Failed to fetch employee detail:", error);
      } finally {
        setLoading(false);
      }
    };
    employee_Detail();
  }, [accessToken, getEmployeeId]);

  const firstName = viewProfile?.user?.first_name ?? "";
  const lastName = viewProfile?.user?.last_name ?? "";
  const grandfatherName = viewProfile?.user?.grandfather_name ?? "";
  const fullName = [firstName, lastName, grandfatherName]
    .filter(Boolean)
    .join(" ");

  const initials = fullName
    ? fullName
        .split(/\s+/)
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "E";

  const status = viewProfile?.employer_status;
  const statusLabel = status === "Unavailabel" ? "Unavailable" : status;

  const formatDate = (date) => {
    if (!date) return "Not set";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const genderFilter = viewProfile?.gender;
  const renderGenderTitle = () => {
    const prefix =
      genderFilter === "Male" ? "Mr." : genderFilter === "Female" ? "Ms." : "";
    return `${prefix} ${fullName || "Employee profile"}`.trim();
  };

  return (
    <div className="Right_dashboard-sidebar border-start border-bottom rounded-bottom-1 p-3">
      <div className="dashboard-sidebar-inner px-2">
        <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
          <div>
            <h4 className="fw-bold m-0" style={{ fontSize: "1.1rem" }}>
              Employee Details
            </h4>
            <small className="text-muted">Viewing profile information</small>
          </div>
          <span className="badge bg-light text-dark border">
            ID: {viewProfile.employee_id || getEmployeeId}
          </span>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3 pb-4">
            {/* Avatar & Name Header */}
            <div className="card p-3 bg-light border-0 shadow-sm text-center">
              <div className="d-flex flex-column align-items-center gap-2">
                <div
                  className="rounded-circle overflow-hidden border shadow-sm bg-white d-flex align-items-center justify-content-center"
                  style={{
                    width: "100px",
                    height: "100px",
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#245c52",
                  }}
                >
                  {viewProfile?.personal_photo ? (
                    <img
                      src={
                        viewProfile.personal_photo.startsWith("http")
                          ? viewProfile.personal_photo
                          : `http://127.0.0.1:8000${viewProfile.personal_photo}`
                      }
                      alt={`${fullName || "Employee"} profile`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span>{initials}</span>
                  )}
                </div>
                <div>
                  <h5 className="fw-bold mb-1 text-dark">
                    {renderGenderTitle()}
                  </h5>
                  <p className="text-muted small mb-1">
                    {viewProfile?.job_title || "Position not set"}
                  </p>
                  {statusLabel && (
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${status === "On Work" ? "border-green-500 text-green-700 bg-green-50/50" : "border-red-500 text-red-700 bg-red-50/50"}`}
                      style={{ fontSize: "0.75rem" }}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          status === "On Work" ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></span>
                      {statusLabel}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="p-3 border rounded shadow-sm bg-white">
              <h6 className="fw-bold border-bottom pb-2 mb-3 text-success">
                Personal Information
              </h6>
              <div className="d-flex flex-column gap-2 small">
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span className="text-muted fw-semibold">Email:</span>
                  <span className="fw-medium text-end">
                    {viewProfile?.email || "Not set"}
                  </span>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span className="text-muted fw-semibold">Phone:</span>
                  <span className="fw-medium text-end">
                    {viewProfile?.phone_number
                      ? `+251 ${viewProfile.phone_number}`
                      : "Not set"}
                  </span>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span className="text-muted fw-semibold">Address:</span>
                  <span className="fw-medium text-end">
                    {viewProfile?.Address || "Not set"}
                  </span>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span className="text-muted fw-semibold">
                    Emergency Contact:
                  </span>
                  <span className="fw-medium text-end">
                    {viewProfile?.emergency_contact
                      ? `+251 ${viewProfile.emergency_contact}`
                      : "Not set"}
                  </span>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span className="text-muted fw-semibold">Date of Birth:</span>
                  <span className="fw-medium text-end">
                    {formatDate(viewProfile?.date_Of_Birth)}
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted fw-semibold">Gender:</span>
                  <span className="fw-medium text-end">
                    {viewProfile?.gender || "Not set"}
                  </span>
                </div>
              </div>
            </div>

            {/* Job Information */}
            <div className="p-3 border rounded shadow-sm bg-white">
              <h6 className="fw-bold border-bottom pb-2 mb-3 text-success">
                Job Information
              </h6>
              <div className="d-flex flex-column gap-2 small">
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span className="text-muted fw-semibold">Employee ID:</span>
                  <span className="fw-medium text-end">
                    {viewProfile?.employee_id || "Not set"}
                  </span>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span className="text-muted fw-semibold">Job Title:</span>
                  <span className="fw-medium text-end">
                    {viewProfile?.job_title || "Not set"}
                  </span>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span className="text-muted fw-semibold">
                    Employment Status:
                  </span>
                  <span className="fw-medium text-end">
                    {viewProfile?.employer_status || "Not set"}
                  </span>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span className="text-muted fw-semibold">Hire Date:</span>
                  <span className="fw-medium text-end">
                    {formatDate(viewProfile?.hire_date)}
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted fw-semibold">Salary:</span>
                  <span className="fw-medium text-end">
                    {viewProfile?.salary
                      ? `${viewProfile.salary} ETB`
                      : "Not set"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default View_profile;
