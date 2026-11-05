import Employees_side from "../../employee/employe";
import Payroll from "../../payroll/payroll";
import Attendance from "../../Attendance/attendance";
import Profile from "../../profile/Profile";
import Employee_List from "../../employee-list/employee-list";
import { Icons } from "../../../assets/Icons/icons";

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
            ["Employers", allEmployers, Icons.employees, "employees"],
            ["On Work", 20, Icons.on_work, "on-work"],
            ["On Leave", 5, Icons.on_leave, "on-leave"],
          ].map(([item, value, Icon, tone]) => (
            <section
              className={`dashboard-stat-card dashboard-stat-card--${tone}`}
              key={item}
            >
              <div className="dashboard-stat-card__icon" aria-hidden="true">
                <Icon />
              </div>
              <div className="dashboard-stat-card__content">
                <p className="text-light">{item}</p>
                <h2>{value ?? 0}</h2>
              </div>
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
