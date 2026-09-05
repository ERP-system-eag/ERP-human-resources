import { Link } from "react-router-dom";
import { Icons } from "../../../../assets/Icons/icons";
import { useState } from "react";
function Employee_Login({ Employee, setEmployee, step, setStep, handelNext }) {
  return (
    <>
      <div>
        <div className="d-flex justify-content-center align-items-center gap-2 p-2">
          <div className="login-field">
            <label>First Name</label>
            <input
              type="text"
              placeholder="Jane"
              className="form-control text-secondary fw-semibold"
              value={Employee.first}
              onChange={(e) =>
                setEmployee({
                  ...Employee,
                  first: e.target.value,
                })
              }
            />
          </div>

          <div className="login-field">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Doe"
              className="form-control text-secondary fw-semibold"
              value={Employee.last}
              onChange={(e) =>
                setEmployee({
                  ...Employee,
                  last: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center gap-2 p-2">
          <div className="login-field">
            <label>GrandFather Name</label>
            <input
              type="text"
              placeholder="Junior"
              className="form-control text-secondary fw-semibold"
              value={Employee.grand}
              onChange={(e) =>
                setEmployee({
                  ...Employee,
                  grand: e.target.value,
                })
              }
            />
          </div>

          <div className="login-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="text@gmail.com"
              className="form-control text-secondary fw-semibold"
              value={Employee.email}
              onChange={(e) =>
                setEmployee({
                  ...Employee,
                  email: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center gap-2 p-2">
          <div className="login-field w-100">
            <label>Password</label>
            <input
              type="password"
              placeholder="***********"
              className="form-control text-secondary fw-semibold"
              value={Employee.password}
              onChange={(e) =>
                setEmployee({
                  ...Employee,
                  password: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="d-flex justify-content-center align-itmes-center gap-4">
          <button
            onClick={handelNext}
            className="w-100 btn login-submit d-flex justify-content-center align-items-center gap-2 fw-bold border border-secondary border-opacity-25 btn-primary"
          >
            Next
            <Icons.right_arrow />
          </button>
          <Link to={"/login"} className="text-dark fw-bolder">
            I have an account Login
          </Link>
        </div>
      </div>
    </>
  );
}
export default Employee_Login;
