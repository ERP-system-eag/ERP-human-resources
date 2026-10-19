import { Icons } from "../../../assets/Icons/icons";

function Sidebar({ setEmployee, jsonData }) {
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
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar-inner">
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
              jsonData?.is_admin,
          )
          .map((item) => {
            const IconComponent = sidebarIcons[item];
            return (
              <button
                className="dashboard-sidebar-link d-flex justify-content-start align-items-center gap-2 "
                onClick={() => handelChange(item)}
                key={item}
                type="button"
                style={{ fontSize: "14px" }}
              >
                {IconComponent && <span>{IconComponent}</span>}
                <span>{item}</span>
              </button>
            );
          })}
      </div>
    </aside>
  );
}

export default Sidebar;
