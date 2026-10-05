import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// first & second login component
import Employee_Login from "./login-component/login-employe-first";
import Employee_Login_sec from "./login-component/login-empoye-second";

// Toastify
import { toast } from "react-toastify";

function MainLoginComponent() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [Employee, setEmployee] = useState({
    first: "",
    last: "",
    grand: "",
    email: "",
    password: "",
  });

  const handelNext = () => {
    if (
      !Employee.first ||
      !Employee.last ||
      !Employee.grand ||
      !Employee.email ||
      !Employee.password
    ) {
      return;
    }
    setStep(2);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("first_name", Employee.first);
    formData.append("last_name", Employee.last);
    formData.append("grandfather_name", Employee.grand);
    formData.append("email", Employee.email);
    formData.append("password", Employee.password);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/users/authrized/employe/create",
        {
          method: "POST",
          body: formData,
        },
      );

      const contentType = response.headers.get("content-type");

      let data;

      if (contentType?.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      toast.success("Employee Sign up Successfully!!");
      navigate("/login");

      // console.log("STATUS:", response.status);
      // console.log("RESPONSE:", data);

      if (!response.ok) {
        // console.log("Validation error", data);
        return;
      }
      // console.log("Employee Create", data);
      navigate("/login");
    } catch (error) {
      // console.log("Request error", error);
      toast.error("invalid");
    }
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

          <form className="login-card" onSubmit={handelSubmit}>
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
                  handelNext={handelNext}
                />
              )}

              {step === 2 && (
                <Employee_Login_sec
                  Employee={Employee}
                  setEmployee={setEmployee}
                  step={step}
                  setStep={setStep}
                  handelSubmit={handelSubmit}
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
