import Employees_side from "../../employee/employe";
import Payroll from "../../payroll/payroll";
import Attendance from "../Attendance/attendance";

function Mainbody({ employee }) {
  return (
    <main className="dashboard-main">
      <div className="dashboard-card-grid">
        {["Employees", "Departments", "Requests", "Reports"].map((item) => (
          <section className="dashboard-stat-card" key={item}>
            <p>{item}</p>
            <h2>0</h2>
          </section>
        ))}
      </div>

      <section className="dashboard-panel">
        {employee === "Employees" && <Employees_side />}
        {employee === "Attendance" && <Attendance />}
        {employee === "Payroll" && <Payroll />}
      </section>
    </main>
  );
}

export default Mainbody;
