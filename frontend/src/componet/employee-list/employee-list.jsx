import { useEffect, useState } from "react";
import { useAuth } from "../../context-auth/AuthContext";
function Employee_List() {
  const { accessToken } = useAuth();
  const [recevieEmployee, setrecevieEmployee] = useState([]);
  useEffect(() => {
    const employee_list_data = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/users/auth/admin-employ-list",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const data = await response.json();
        setrecevieEmployee(data);
      } catch (error) {
        //
      }
    };
    employee_list_data();
  }, [accessToken]);

  console.log(recevieEmployee);
  return (
    <>
      <div className="p-6">
        <div className="p-6">
          <h1>Employer's List</h1>
        </div>
        <div className="p-6">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Photo</th>
                <th scope="col">Full Name</th>
                <th scope="col">Employer ID</th>
                <th scope="col">Working Status</th>
              </tr>
            </thead>
            {recevieEmployee.map((recevieEmployee) => (
              <tbody>
                <tr key={recevieEmployee.unique_id}>
                  <th scope="row">1</th>
                  <td>
                    <img
                      className="dashboard-avatar-placeholder w-20 h-20 overflow-hidden rounded-circle"
                      src={`http://127.0.0.1:8000${recevieEmployee.personal_photo}`}
                      alt=""
                    />
                  </td>
                  <td>
                    {recevieEmployee.first_name} {recevieEmployee.last_name}{" "}
                    {recevieEmployee.grandfather_name}
                  </td>
                  <td>{recevieEmployee.unique_id}</td>
                  <td>On work</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export default Employee_List;
