import { useEffect, useState } from "react";
import { useAuth } from "../../../context-auth/AuthContext";
import { Icons } from "../../../assets/Icons/icons";

function Employee_Attendance({ ownInfoEmployee }) {
  const { accessToken } = useAuth();

  // Store one employee object, not an array
  const [receivedEmployeeAttend, setReceivedEmployeeAttend] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getEmployeeAttendance = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/employee/auth/profile/employee-detail/${ownInfoEmployee}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();

        console.log("Employee data:", data);

        // Store the object directly
        setReceivedEmployeeAttend(data);
      } catch (error) {
        console.error("Error fetching employee:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken && ownInfoEmployee) {
      getEmployeeAttendance();
    }
  }, [accessToken, ownInfoEmployee]);

  if (loading) {
    return <p>Loading employee information...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!receivedEmployeeAttend) {
    return <p>No employee information available.</p>;
  }

  return (
    <div className="attendance-grid">
      <div>
        <div
          className="card border-1 shadow-sm rounded-4 p-4 h-100 bg-white"
          style={{
            border: "1px solid rgba(226, 232, 240, 0.8)",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
          }}
        >
          {/* Employee Info Header */}
          <div className="d-flex align-items-center gap-3 mb-3">
            <div className="overflow-hidden">
              <h6
                className="fw-bold text-dark mb-1 text-truncate"
                style={{ fontSize: "14px" }}
              >
                {receivedEmployeeAttend.user?.first_name}{" "}
                {receivedEmployeeAttend.user?.last_name}
              </h6>

              <p
                className="text-muted mb-0 text-truncate"
                style={{ fontSize: "12px" }}
              >
                {receivedEmployeeAttend.job_title || "Employee"}
              </p>
            </div>
          </div>

          {/* Time Info Body */}
          <div className="d-flex flex-column">
            <div
              className="d-flex justify-content-between align-items-center p-2 rounded-3"
              style={{ background: "#f8fafc" }}
            >
              <div
                className="d-flex align-items-center gap-2 text-secondary"
                style={{ fontSize: "12px" }}
              >
                <span className="text-primary">
                  <Icons.time />
                </span>
                <span>
                  In: <strong className="text-dark">--:--</strong>
                </span>
              </div>

              <div
                className="d-flex align-items-center gap-2 text-secondary"
                style={{ fontSize: "12px" }}
              >
                <span className="text-muted">
                  <Icons.time />
                </span>
                <span>
                  Out: <strong className="text-dark">--:--</strong>
                </span>
              </div>
            </div>

            {/* Status & Hours Footer */}
            <div className="d-flex justify-content-between align-items-center mt-2">
              <span
                className="p-2 fw-bolder rounded-2"
                style={{
                  fontSize: "11px",
                  color: "#15803d",
                  background: "#f0fdf4",
                }}
              >
                Attendance not connected
              </span>

              <div className="text-end">
                <p
                  className="fw-bold mb-0 text-dark"
                  style={{ fontSize: "10px" }}
                >
                  --h --m
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employee_Attendance;
