function Sidebar({ setEmployee }) {
  const handelChange = (item) => {
    setEmployee(item);
  };
  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar-inner">
        {["Dashboard", "Employees", "Attendance", "Payroll"].map((item) => (
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
