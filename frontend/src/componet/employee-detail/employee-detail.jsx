import { useEffect } from "react";
import { useAuth } from "../../context-auth/AuthContext";

function Employee_Detail({ getEmployeeId }) {
  const { accessToken } = useAuth();
  // console.log("This is Employee Id", getEmployeeId);
  useEffect(() => {
    if (!getEmployeeId || !accessToken) return;

    const getEmployee = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/employee/auth/profile/employee-detail/${getEmployeeId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const data = await response.json();
        // console.log("This is data fetch from Employee Id: ", data);
      } catch (error) {
        //
      }
    };
    getEmployee();
  }, [getEmployeeId, accessToken]);
  return (
    <>
      <div className="p-4">
        <div></div>
      </div>
    </>
  );
}

export default Employee_Detail;
