import { useState } from "react";
import { Icons } from "../../../assets/Icons/icons";

// first & second login component
import Employee_Login from "./login-component/login-employe-first";
import Employee_Login_sec from "./login-component/login-empoye-second";

function MainLoginComponent() {
  const [step, setStep] = useState(2);
  const [Employee, setEmployee] = useState({
    first: "",
    last: "",
    grand: "",
    email: "",

    age: "",
    unique_id: "",
    personal_photo: null,
  });

  const handelNext = () => {
    if ((!Employee.first, !Employee.last, !Employee.grand, !Employee.email)) {
      return;
    }
    setStep(2);
  };
  return (
    <>
      <main className="login-page min-vh-100">
        <section className="login-shell container">
          <div className="login-visual" aria-hidden="true">
            <div className="login-brand">
              <span>EAG Church - 6 Kilo</span>
              <strong>Human Resources ERP</strong>
            </div>

            <div className="login-status-panel">
              <p className="mb-1">Secure workspace</p>
              <strong>Employee records stay organized and ready.</strong>
            </div>
          </div>

          <form className="login-card">
            <div className="login-card-header">
              <p className="login-eyebrow mb-2">Welcome back</p>
              <h1>Sign up to your HR workspace</h1>
              <p>
                Access employee records, attendance updates, and payroll
                preparation from one place.
              </p>
            </div>

            <div>
              {step === 1 && (
                <Employee_Login
                  Employee={Employee}
                  setEmployee={setEmployee}
                  step={step}
                  setStep={setStep}
                />
              )}

              {step === 2 && (
                <Employee_Login_sec
                  Employee={Employee}
                  setEmployee={setEmployee}
                  step={step}
                  setStep={setStep}
                />
              )}
            </div>

            <div className="login-footer"></div>
          </form>
        </section>
      </main>
    </>
  );
}

export default MainLoginComponent;
