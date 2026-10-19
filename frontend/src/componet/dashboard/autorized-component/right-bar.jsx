import AddEmployee from "../../right-bar-employ/add-employee";
import Right_bar_employee_info from "../../right-bar-employ/right-bar-employ";
import "../dashboard-layout.css";
function Right_bar({ allowRight, getEmployeeId, onEmployeeUpdated }) {
  if (allowRight === "EditBtn") {
    return (
      <Right_bar_employee_info
        getEmployeeId={getEmployeeId}
        onEmployeeUpdated={onEmployeeUpdated}
      />
    );
  }
  if (allowRight === "createEmployee") {
    return <AddEmployee />;
  }
  return (
    <>
      <div className="Right_dashboard-sidebar border-start border-bottom rounded-bottom-1">
        <div className="dashboard-sidebar-inner">
          <div className="d-flex flex-grow-1 justify-content-center align-items-center">
            <h1 className="text-secondary text-center fs-6">No response...</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Right_bar;
