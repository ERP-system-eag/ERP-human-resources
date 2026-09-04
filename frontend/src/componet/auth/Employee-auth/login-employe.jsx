import { Icons } from "../../../assets/Icons/icons";
import { useState } from "react";
function Employee_Login() {
  const [step, setStep] = useState(1);
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
            </div>

            <button className="btn login-submit d-flex justify-content-center align-items-center gap-2 fw-bold border border-secondary border-opacity-25 btn btn-primary">
              Next
              <Icons.right_arrow />
            </button>

            <div className="login-footer"></div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Employee_Login;
