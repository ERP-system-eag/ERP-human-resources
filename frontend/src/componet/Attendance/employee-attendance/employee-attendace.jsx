import { useEffect, useState } from "react";
import { useAuth } from "../../../context-auth/AuthContext";
import { Icons } from "../../../assets/Icons/icons";
import { toast } from "react-toastify";

function Employee_Attendance({ ownInfoEmployee }) {
  const { accessToken } = useAuth();

  // Store one employee object, not an array
  const [receivedEmployeeAttend, setReceivedEmployeeAttend] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    if (accessToken && ownInfoEmployee) {
      getEmployeeAttendance();
    }
  }, [accessToken, ownInfoEmployee]);

  if (loading && !receivedEmployeeAttend) {
    return <p>Loading employee information...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!receivedEmployeeAttend) {
    return <p>No employee information available.</p>;
  }

  const handelCheckIn = async (e) => {
    try {
      const now = new Date();

      const currentData = now.toISOString().split("T")[0];
      const currentTimeStamp = now.toISOString();

      const employeeProfile = receivedEmployeeAttend;

      const payload = {
        employee: employeeProfile.user.id,
        date: currentData,
        check_in: currentTimeStamp,
        check_in_notes: "PRESENT",
        // you can check out letter
      };

      const response = await fetch(
        `http://127.0.0.1:8000/api/attendance/attendanc/save_employee/information/${ownInfoEmployee}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `Attendance failed (${response.status}): ${JSON.stringify(data)}`,
        );
      }

      toast.success("Attendance saved successfully!");
      console.log("Attendance saved successfully:", data);

      // Re-fetch employee attendance details to update records list
      getEmployeeAttendance();
    } catch (error) {
      console.error("Error submit handel: ", error);
      toast.error(error.message || "Failed to save attendance");
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom gap-3">
        <div>
          <h2
            className="fw-bold mb-1"
            style={{ fontSize: "1.25rem", color: "#1e293b" }}
          >
            Employee Attendance
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
            Monitor daily check-ins, working hours, and attendance status.
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-outline-primary d-flex align-items-center gap-2 px-3 py-2 fw-semibold shadow-sm"
            style={{ fontSize: "13px", borderRadius: "8px" }}
          >
            <Icons.time />
            Time Attendance
          </button>

          <button
            className="btn btn-light border d-flex align-items-center gap-2 px-3 py-2 fw-semibold shadow-sm"
            style={{ fontSize: "13px", borderRadius: "8px", color: "#475569" }}
          >
            <Icons.filter />
            Filter
          </button>
        </div>
      </div>

      <div className="attendance-grid">
        <div>
          <div
            className="card attendance-employee-card attendance-employee-card--personal border-1 shadow-sm rounded-4 p-4 h-100 bg-white"
            style={{
              border: "1px solid rgba(226, 232, 240, 0.8)",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
            }}
          >
            {/* Employee Info Header */}
            <div className="d-flex align-items-center gap-3 mb-3">
              <img
                className="rounded-circle object-fit-cover shadow-sm"
                style={{
                  width: "52px",
                  height: "52px",
                  border: "2px solid #e2e8f0",
                }}
                src={
                  receivedEmployeeAttend.personal_photo
                    ? `http://127.0.0.1:8000${receivedEmployeeAttend.personal_photo}`
                    : "https://via.placeholder.com/52"
                }
                alt={`${receivedEmployeeAttend.user?.first_name || ""} ${receivedEmployeeAttend.user?.last_name || ""}`}
              />
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

            {/* Attendance Records */}
            {receivedEmployeeAttend.attendance &&
            receivedEmployeeAttend.attendance.length > 0 ? (
              receivedEmployeeAttend.attendance.map((attendance) => (
                <div key={attendance.id || attendance.date} className="mb-3">
                  {/* Time Info Body */}
                  <div className="d-flex flex-column">
                    <div
                      className="d-flex justify-content-between align-items-center p-2.5 rounded-3"
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
                          In:{" "}
                          <strong className="text-dark">
                            {attendance.check_in
                              ? new Date(
                                  attendance.check_in,
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })
                              : "--:--"}
                          </strong>
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

                    {/* Status & Date Footer */}
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <span
                        className="p-2 fw-bolder border-green-500 text-green-700 bg-green-50/50 rounded-2"
                        style={{
                          fontSize: "11px",
                        }}
                      >
                        {attendance?.status || "PRESENT"}
                      </span>

                      <div className="text-end">
                        <p
                          className="fw-bold mb-0 text-dark"
                          style={{ fontSize: "11px" }}
                        >
                          {attendance.date ? attendance.date : "--:--"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="text-muted text-center py-3"
                style={{ fontSize: "13px" }}
              >
                No attendance records found.
              </div>
            )}

            {/* Check In Action */}
            <div className="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
              <span className="text-muted" style={{ fontSize: "12px" }}>
                Ready to check in?
              </span>
              <button
                onClick={handelCheckIn}
                className="btn btn-success btn-sm px-3 py-1.5 fw-semibold shadow-sm"
                style={{ fontSize: "12px", borderRadius: "6px" }}
              >
                Check In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Employee_Attendance;
