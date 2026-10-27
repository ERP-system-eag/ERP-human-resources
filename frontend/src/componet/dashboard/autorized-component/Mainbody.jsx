import Employees_side from "../../employee/employe";
import Payroll from "../../payroll/payroll";
import Attendance from "../../Attendance/attendance";
import Profile from "../../profile/Profile";
import Employee_List from "../../employee-list/employee-list";

function Mainbody({
  employee,
  jsonData,
  employeeProfile,
  letComplateProfile,
  employeData,
  setEmployee,
  complated,
  setAllEmpoyers,
  allEmployers,
  setEmployeeId,
  setAllowRight,
  employeeListVersion,
}) {
  const AdminstratorOnly = () => {
    if (jsonData.is_admin) {
      return (
        <div className="dashboard-card-grid">
          {[
            ["Employers", allEmployers],
            ["On Work", 20],
            ["On Leave", 5],
          ].map(([item, value]) => (
            <section className="dashboard-stat-card" key={item}>
              <p>{item}</p>
              <h2>{value}</h2>
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
        {employee === "Employer List" && (
          <Employee_List
            employeeProfile={employeeProfile}
            employeData={employeData}
            setAllEmpoyers={setAllEmpoyers}
            setEmployeeId={setEmployeeId}
            setAllowRight={setAllowRight}
            employeeListVersion={employeeListVersion}
          />
        )}
      </section>
    </main>
  );
}

export default Mainbody;
