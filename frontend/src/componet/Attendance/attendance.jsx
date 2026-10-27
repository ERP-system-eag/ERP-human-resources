import { useEffect, useState } from "react";
import { Icons } from "../../assets/Icons/icons";
import { useAuth } from "../../context-auth/AuthContext";

function Attendance() {
  const { accessToken } = useAuth();
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

  return (
    <div className="container-fluid p-4">
      {/* Header section */}
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

      {/* Content Section */}
      {loading ? (
        <div
          className="text-center py-5 text-muted"
          style={{ fontSize: "14px" }}
        >
          Loading employee attendance records...
        </div>
      ) : getAllEmployees.length === 0 ? (
        <div
          className="text-center py-5 text-muted bg-white rounded-3 shadow-sm p-4"
          style={{ fontSize: "14px" }}
        >
          No employee attendance records found.
        </div>
      ) : (
        <div className="row g-2">
          {getAllEmployees.map((Allemployee, index) => (
            <div className="col-3" key={Allemployee.id || index}>
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
                  <img
                    className="rounded-circle object-fit-cover shadow-sm"
                    style={{
                      width: "52px",
                      height: "52px",
                      border: "2px solid #e2e8f0",
                    }}
                    src={
                      Allemployee.personal_photo
                        ? `http://127.0.0.1:8000${Allemployee.personal_photo}`
                        : "https://via.placeholder.com/52"
                    }
                    alt={`${Allemployee.user?.first_name || ""} ${Allemployee.user?.last_name || ""}`}
                  />
                  <div className="overflow-hidden">
                    <h6
                      className="fw-bold text-dark mb-1 text-truncate"
                      style={{ fontSize: "14px" }}
                    >
                      {Allemployee.user?.first_name}{" "}
                      {Allemployee.user?.last_name}
                    </h6>
                    <p
                      className="text-muted mb-0 text-truncate"
                      style={{ fontSize: "12px" }}
                    >
                      {Allemployee.job_title || "Employee"}
                    </p>
                  </div>
                </div>

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
                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <span
                      className="p-2  fw-bolder border-green-500 text-green-700 bg-green-50/50"
                      style={{
                        fontSize: "11px",
                      }}
                    >
                      Present
                    </span>

                    <div className="text-end">
                      <p
                        className="fw-bold mb-0 text-dark"
                        style={{ fontSize: "10px" }}
                      >
                        00h 00m
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Attendance;
