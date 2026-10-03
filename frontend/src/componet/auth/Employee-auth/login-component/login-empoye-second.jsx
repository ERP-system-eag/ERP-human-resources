import { Icons } from "../../../../assets/Icons/icons";
import { useState } from "react";
function Employee_Login_sec({ Employee, setEmployee, step, setStep }) {
  return (
    <>
      <div>
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
