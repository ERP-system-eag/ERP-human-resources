import { useEffect, useState } from "react";
import { useAuth } from "../../context-auth/AuthContext";

function Employees_side() {
  const [employeeData, setEmployeedata] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    const getEmployeData = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/users/auth/employer-auth-info",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const userdata = await response.json();
      if (!response.ok) {
        console.log(userdata);
      }
      setEmployeedata(userdata);
    };
    if (accessToken) {
      getEmployeData();
    }
  }, [accessToken]);

  const handelEmployeeInfo = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/employee/auth/employee-info",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gender,
            date_Of_Birth,
            phone_number,
            Address,
            emergency_contact,
            employee_id,
            job_title,
            hire_date,
            employer_status,
          }),
        },
      );
      const data = await response.json().catch(() => ({}));
    } catch (error) {
      console.log("Submion error", error);
    }
  };
  return (
    <>
      <div>
        <div>
          <h1>This Employee page is component is work</h1>
        </div>
        <form onSubmit={handelEmployeeInfo}>
          <div></div>
        </form>
      </div>
    </>
  );
}
export default Employees_side;
