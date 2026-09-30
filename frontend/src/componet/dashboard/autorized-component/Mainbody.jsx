import Employees_side from "../../employee/employe";
import Payroll from "../../payroll/payroll";
import Attendance from "../Attendance/attendance";
import Profile from "../../profile/Profile";

function Mainbody({
  employee,
  jsonData,
  employeeProfile,
  letComplateProfile,
  employeData,
  setEmployee,
  complated,
}) {
  const AdminstratorOnly = () => {
    if (jsonData.is_admin) {
      return (
        <div className="dashboard-card-grid">
          {["Employees", "Departments", "Requests", "Reports"].map((item) => (
            <section className="dashboard-stat-card" key={item}>
              <p>{item}</p>
              <h2>0</h2>
            </section>
          ))}
        </div>
      );
    }
  };
  return (
    <main className="dashboard-main">
      <div>{AdminstratorOnly()}</div>
      <section className="dashboard-panel">
        {employee === "Employees" && (
          <Employees_side setEmployee={setEmployee} />
        )}
        {employee === "Attendance" && <Attendance />}
        {employee === "Payroll" && <Payroll />}
        {employee === "Profile" && (
          <Profile
            employeeProfile={employeeProfile}
            letComplateProfile={letComplateProfile}
            employeData={employeData}
            setEmployee={setEmployee}
            complated={complated}
          />
        )}
      </section>
    </main>
  );
}

export default Mainbody;
