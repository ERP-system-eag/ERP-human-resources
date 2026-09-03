function Sidebar() {
  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar-inner">
        {["Dashboard", "Employees", "Attendance", "Payroll"].map((item) => (
          <button className="dashboard-sidebar-link" key={item} type="button">
            {item}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
