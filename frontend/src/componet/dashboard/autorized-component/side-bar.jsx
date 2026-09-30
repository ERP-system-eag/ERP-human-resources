function Sidebar({ setEmployee, jsonData }) {
  const handelChange = (item) => {
    setEmployee(item);
  };

  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar-inner">
        {["Profile", "Dashboard", "Employees", "Attendance", "Payroll"]
          .filter(
            (item) =>
              item === "Dashboard" ||
              item === "Employees" ||
              item === "Profile" ||
              jsonData?.is_admin,
          )
          .map((item) => (
            <button
              className="dashboard-sidebar-link"
              onClick={() => handelChange(item)}
              key={item}
              type="button"
            >
              {item}
            </button>
          ))}
      </div>
    </aside>
  );
}

export default Sidebar;
