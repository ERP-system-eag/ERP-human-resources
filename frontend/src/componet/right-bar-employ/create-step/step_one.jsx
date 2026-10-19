import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Icons } from "../../../assets/Icons/icons";

function StepOneEmployee({ setStep, setAddEmployee, AddEmployee }) {
  const handelNext = () => {
    if (
      !AddEmployee.first ||
      !AddEmployee.last ||
      !AddEmployee.grand ||
      !AddEmployee.email ||
      !AddEmployee.password
    ) {
      return;
    }
    setStep(2);
  };

  return (
    <>
      <div>
        <label>First Name</label>
        <input
          type="text"
          placeholder="Jane"
          className="form-control text-secondary fw-semibold"
          value={AddEmployee.first}
          onChange={(e) =>
            setAddEmployee({
              ...AddEmployee,
              first: e.target.value,
            })
          }
        />

        <label>Last Name</label>
        <input
          type="text"
          placeholder="Doe"
          className="form-control text-secondary fw-semibold"
          value={AddEmployee.last}
          onChange={(e) =>
            setAddEmployee({
              ...AddEmployee,
              last: e.target.value,
            })
          }
        />

        <label>GrandFather Name</label>
        <input
          type="text"
          placeholder="Junior"
          className="form-control text-secondary fw-semibold"
          value={AddEmployee.grand}
          onChange={(e) =>
            setAddEmployee({
              ...AddEmployee,
              grand: e.target.value,
            })
          }
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="text@gmail.com"
          className="form-control text-secondary fw-semibold"
          value={AddEmployee.email}
          onChange={(e) =>
            setAddEmployee({
              ...AddEmployee,
              email: e.target.value,
            })
          }
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="***********"
          className="form-control text-secondary fw-semibold"
          value={AddEmployee.password}
          onChange={(e) =>
            setAddEmployee({
              ...AddEmployee,
              password: e.target.value,
            })
          }
        />

        <button
          onClick={handelNext}
          className="w-100 btn login-submit d-flex justify-content-center align-items-center gap-2 fw-bold border border-secondary border-opacity-25 btn-primary"
        >
          Next
          <Icons.right_arrow />
        </button>
      </div>
    </>
  );
}

export default StepOneEmployee;
