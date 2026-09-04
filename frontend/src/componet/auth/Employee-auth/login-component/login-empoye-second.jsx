import { Icons } from "../../../../assets/Icons/icons";
import { useState } from "react";
function Employee_Login_sec({ Employee, setEmployee, step, setStep }) {
  return (
    <>
      <div>
        <div className="d-flex justify-content-center align-items-center gap-2 p-2">
          <div className="login-field">
            <label>Age</label>
            <input
              type="number"
              placeholder="Age"
              className="form-control text-secondary fw-semibold"
              value={Employee.age}
              onChange={(e) =>
                setEmployee({
                  ...Employee,
                  age: e.target.value,
                })
              }
            />
          </div>

          <div className="login-field">
            <label>Unique Id</label>
            <input
              type="text"
              placeholder="ey$*************"
              className="form-control text-secondary fw-semibold"
              value={Employee.unique_id}
              onChange={(e) =>
                setEmployee({
                  ...Employee,
                  unique_id: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center gap-2 p-2">
          <div className="login-field">
            <label>Salary</label>
            <input
              type="number"
              placeholder="5000$"
              className="form-control text-secondary fw-semibold"
              value={Employee.salary}
              onChange={(e) =>
                setEmployee({
                  ...Employee,
                  salary: e.target.value,
                })
              }
            />
          </div>
          <div className="login-field">
            <label>Personal Photo</label>
            <input
              type="file"
              accept="image/*"
              className="form-control text-secondary fw-semibold"
              onChange={(e) =>
                setEmployee({
                  ...Employee,
                  personal_photo: e.target.files[0],
                })
              }
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-100 btn login-submit d-flex justify-content-center align-items-center gap-2 fw-bold border border-secondary border-opacity-25 btn btn-success"
        >
          Submit
          <Icons.upload />
        </button>
      </div>
    </>
  );
}
export default Employee_Login_sec;
