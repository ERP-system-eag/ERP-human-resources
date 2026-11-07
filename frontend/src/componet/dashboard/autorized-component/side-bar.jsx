import { Icons } from "../../../assets/Icons/icons";
import { useAuth } from "../../../context-auth/AuthContext";
import { useNavigate } from "react-router-dom";

function Sidebar({
  setEmployee,
  jsonData,
  employeeProfile,
  username,
  isShrunk,
  setIsShrunk,
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handelChange = (item) => {
    setEmployee(item);
  };

  const sidebarIcons = {
    Profile: <Icons.profile_icon />,
    Dashboard: <Icons.dashboard />,
    Employees: <Icons.profile_icon />,
    Attendance: <Icons.attendance />,
    Payroll: <Icons.payrol />,
    "Employer List": <Icons.employee_list />,
  };

  return (
    <aside
      className="dashboard-sidebar"
      style={{
        width: isShrunk ? "70px" : "260px",
        transition: "width 0.3s ease",
      }}
    >
      <div className="dashboard-sidebar-inner px-1">
        <div
          className={`d-flex m-4  ${isShrunk ? "justify-content-center" : "d-flex align-items-center justify-content-between"}`}
        >
          <h1
            className="m-0 font-weight-bold"
            style={{
              fontSize: isShrunk ? "0.95rem" : "1.25rem",
              textAlign: isShrunk ? "center" : "left",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title="EAG ERP"
          >
            {isShrunk ? "" : "EAG ERP SYSTEM"}
          </h1>
          <button
            className="border p-1 rounded"
            onClick={() => setIsShrunk(!isShrunk)}
            title={isShrunk ? "Expand Sidebar" : "Shrink Sidebar"}
            type="button"
          >
            {isShrunk ? <Icons.expand /> : <Icons.shrink />}
          </button>
        </div>
        {[
          "Profile",
          "Dashboard",
          "Employees",
          "Attendance",
          "Payroll",
          "Employer List",
        ]
          .filter(
            (item) =>
              item === "Dashboard" ||
              item === "Employees" ||
              item === "Profile" ||
              item === "Attendance" ||
              jsonData?.is_admin,
          )
          .map((item) => {
            const IconComponent = sidebarIcons[item];
            return (
              <div>
                <button
                  className={`dashboard-sidebar-link d-flex align-items-center gap-2 mb-1 ${
                    isShrunk
                      ? "justify-content-center px-0 py-2"
                      : "justify-content-start"
                  }`}
                  onClick={() => handelChange(item)}
                  key={item}
                  type="button"
                  title={isShrunk ? item : undefined}
                  style={{ fontSize: "14px" }}
                >
                  {IconComponent && (
                    <span className="fs-5">{IconComponent}</span>
                  )}
                  {!isShrunk && <span>{item}</span>}
                </button>
              </div>
            );
          })}
        <div className="dashboard-sidebar-account">
          <div
            className={`dashboard-sidebar-user ${isShrunk ? "justify-content-center" : ""}`}
          >
            <div className="dashboard-sidebar-avatar dashboard-avatar-placeholder overflow-hidden rounded-circle">
              {employeeProfile?.personal_photo && (
                <img
                  src={`http://127.0.0.1:8000${employeeProfile.personal_photo}`}
                  alt="Profile"
                />
              )}
            </div>
            {!isShrunk && (
              <div className="dashboard-sidebar-user-copy">
                <strong className="text-uppercase">
                  {employeeProfile?.user?.first_name || "Employee"}{" "}
                  {employeeProfile?.user?.last_name || "Employee"}
                </strong>
                {jsonData?.is_admin && <small>Administrator</small>}
              </div>
            )}
          </div>
          <button
            className="dashboard-sidebar-logout"
            onClick={handleLogout}
            type="button"
            title="Logout"
          >
            <Icons.right_arrow />
            {!isShrunk && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
