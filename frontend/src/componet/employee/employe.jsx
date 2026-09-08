import { useEffect, useState } from "react";
import { useAuth } from "../../context-auth/AuthContext";
import { data } from "react-router-dom";

function Employees_side() {
  const { accessToken } = useAuth();
  const [jobTitle, setJobTitle] = useState([]);

  useEffect(() => {
    const handelResponse = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/employee/auth/job-titles",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const data = await response.json();

        setJobTitle(data);
      } catch (error) {
        console.log(error);
      }
    };
    handelResponse();
  }, [accessToken]);
  return (
    <>
      <div>
        <div>
          <h1>This Employee page is component is work</h1>
        </div>
        <form>
          <div>
            <div>
              <select value={jobTitle} onChange={setJobTitle}>
                <option value="">Select your Job Field</option>

                {jobTitle.map((job) => (
                  <option key={job.value} value={job.value}>
                    {job.lable}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default Employees_side;
