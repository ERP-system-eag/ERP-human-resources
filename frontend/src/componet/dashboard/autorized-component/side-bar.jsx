import { Icons } from "../../../assets/Icons/icons";

function Sidebar({ setEmployee, jsonData, isShrunk, setIsShrunk }) {
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
      </div>
    </aside>
  );
}

export default Sidebar;
