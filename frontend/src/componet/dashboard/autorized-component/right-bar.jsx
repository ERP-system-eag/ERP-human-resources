import Right_bar_employee_info from "../../right-bar-employ/right-bar-employ";

function Right_bar({ allowRight, getEmployeeId }) {
  //   const Right_bar_employee = () => {
  //     if (allowRight === true) return <Right_bar_employee_info />;
  //   };
  console.log("is it True: ", getEmployeeId);
  return (
    <>
      {allowRight ? (
        <Right_bar_employee_info getEmployeeId={getEmployeeId} />
      ) : (
        <div className="Right_dashboard-sidebar border-start border-bottom rounded-bottom-1">
          <div className="dashboard-sidebar-inner">
            <div className="d-flex flex-grow-1 justify-content-center align-items-center">
              <h1 className="text-secondary text-center fs-6">
                No response...
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Right_bar;
