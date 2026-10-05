import { useEffect, useState } from "react";
import { useAuth } from "../../context-auth/AuthContext";
import { Icons } from "../../assets/Icons/icons";
import "./employe.css";
import Profile from "../profile/Profile";
import { useNavigate } from "react-router-dom";

// Toastify
import { toast } from "react-toastify";

function Employees_side({ setEmployee }) {
  const navigate = useNavigate("");
  const { accessToken, reloadPage } = useAuth();

  const [formStore, setFormStore] = useState({
    date: "",
    phone: "",
    emergencey_phone: "",
    employer_id: "",
    hire_date: "",
    salary: "",
    personal_photo: "",
  });

  const [choices, setChoices] = useState({});
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const handelResponse = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/employee/auth/choices",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const data = await response.json();

        setChoices(data);
      } catch (error) {
        // console.log(error);
      }
    };
    handelResponse();
  }, [accessToken]);

  const handelSubmitInfo = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("date_Of_Birth", formStore.date);
    formData.append("phone_number", formStore.phone);
    formData.append("emergency_contact", formStore.emergencey_phone);
    formData.append("employee_id", formStore.employer_id);
    formData.append("hire_date", formStore.hire_date);
    formData.append("salary", formStore.salary);
    if (formStore.personal_photo) {
      formData.append("personal_photo", formStore.personal_photo);
    }

    formData.append("Address", selectedAddress);
    formData.append("gender", selectedGender);
    formData.append("job_title", selectedTitle);
    formData.append("employer_status", selectedStatus);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/employee/auth/employee-info",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        },
      );
      const data = await response.json();
      // console.log("STATUS: ", response.status);
      // console.log("RESPONSE:", data);
      // toastify
      toast.success("Employee created successfully!");

      setTimeout(() => {
        reloadPage();
      }, 4000);
    } catch (error) {
      toast.error("Invalid Error or Input!");
      // console.log(error);
    }
  };

  const updateField = (field) => (e) => {
    const { value } = e.target;
    setFormStore((prev) => ({ ...prev, [field]: value }));
  };

  const formRowStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "1rem",
    width: "100%",
    marginBottom: "0.5rem",
  };

  const formColumnStyle = {
    display: "grid",
    gap: "0.5rem",
  };

  const selectWithIconStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    width: "100%",
  };

  const inputAddonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "2.7rem",
    height: "3.1rem",
    borderRadius: "0 8px 8px 0",
    border: "1px solid rgba(17, 24, 39, 0.16)",
    borderLeft: "none",
    background: "#f8fafc",
    color: "#475569",
    marginLeft: "-1px",
    padding: "0 0.75rem",
  };

  return (
    <>
      <div style={{ padding: "1.5rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h1 style={{ margin: 0 }}>Employee Information</h1>
        </div>
        <form
          className=""
          onSubmit={handelSubmitInfo}
          style={{ padding: "1.5rem" }}
        >
          <div
            className="login-card mb-1"
            style={{ display: "grid", gap: "1rem" }}
          >
            <h3>Coupany Information</h3>
            <div style={formRowStyle}>
              <div style={formColumnStyle}>
                <div className="login-field">
                  <label>Job Title</label>
                  <div style={selectWithIconStyle}>
                    <select
                      value={selectedTitle}
                      onChange={(e) => setSelectedTitle(e.target.value)}
                      className="form-control fw-bold"
                      style={{ borderRadius: "8px 0 0 8px" }}
                    >
                      <option value="">Select your Job Field</option>

                      {choices.job_title?.map((job) => (
                        <option key={job.value} value={job.value}>
                          {job.label}
                        </option>
                      ))}
                    </select>
                    <span className="input-group-text" style={inputAddonStyle}>
                      <Icons.down />
                    </span>
                  </div>
                </div>
              </div>
              <div style={formColumnStyle}>
                <div className="login-field">
                  <label>Address</label>
                  <div style={selectWithIconStyle}>
                    <select
                      value={selectedAddress}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      className="form-control fw-bold"
                      style={{ borderRadius: "8px 0 0 8px" }}
                    >
                      <option value="">Select your address</option>

                      {choices.address?.map((job) => (
                        <option key={job.value} value={job.value}>
                          {job.label}
                        </option>
                      ))}
                    </select>
                    <span className="input-group-text" style={inputAddonStyle}>
                      <Icons.down />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={formRowStyle}>
              <div style={formColumnStyle}>
                <div className="login-field">
                  <label>Gender</label>
                  <div style={selectWithIconStyle}>
                    <select
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      className="form-control fw-bold"
                      style={{ borderRadius: "8px 0 0 8px" }}
                    >
                      <option value="">Select gender</option>

                      {choices.gender?.map((job) => (
                        <option key={job.value} value={job.value}>
                          {job.label}
                        </option>
                      ))}
                    </select>
                    <span className="input-group-text" style={inputAddonStyle}>
                      <Icons.down />
                    </span>
                  </div>
                </div>
              </div>
              <div style={formColumnStyle}>
                <div className="login-field">
                  <label>Employer Status</label>
                  <div style={selectWithIconStyle}>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="form-control fw-bold"
                      style={{ borderRadius: "8px 0 0 8px" }}
                    >
                      <option value="">Select status</option>

                      {choices.employer_status?.map((job) => (
                        <option key={job.value} value={job.value}>
                          {job.label}
                        </option>
                      ))}
                    </select>
                    <span className="input-group-text" style={inputAddonStyle}>
                      <Icons.down />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="login-card mb-1">
            <h3>Personal Information</h3>
            <div style={{ display: "grid", gap: "1rem" }}>
              <div style={formRowStyle}>
                <div className="login-field" style={formColumnStyle}>
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    value={formStore.date}
                    onChange={updateField("date")}
                    className="form-control"
                    style={{ padding: "0.8rem 0.85rem" }}
                  />
                </div>

                <div className="login-field" style={formColumnStyle}>
                  <label>Phone Number</label>
                  <input
                    type="number"
                    value={formStore.phone}
                    onChange={updateField("phone")}
                    className="form-control"
                    style={{ padding: "0.8rem 0.85rem" }}
                  />
                </div>
              </div>

              <div style={formRowStyle}>
                <div className="login-field" style={formColumnStyle}>
                  <label>Employer Id</label>
                  <input
                    type="text"
                    value={formStore.employer_id}
                    onChange={updateField("employer_id")}
                    className="form-control"
                    style={{ padding: "0.8rem 0.85rem" }}
                  />
                </div>

                <div className="login-field" style={formColumnStyle}>
                  <label>Hire Date</label>
                  <input
                    type="date"
                    value={formStore.hire_date}
                    onChange={updateField("hire_date")}
                    className="form-control"
                    style={{ padding: "0.8rem 0.85rem" }}
                  />
                </div>
              </div>

              <div style={formRowStyle}>
                <div className="login-field" style={formColumnStyle}>
                  <label>Personal image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];

                      setFormStore((prev) => ({
                        ...prev,
                        personal_photo: file,
                      }));
                    }}
                    className="form-control"
                    style={{ padding: "0.8rem 0.85rem" }}
                  />
                </div>

                <div className="login-field" style={formColumnStyle}>
                  <label>Salary</label>
                  <input
                    type="number"
                    value={formStore.salary}
                    onChange={updateField("salary")}
                    className="form-control"
                    style={{ padding: "0.8rem 0.85rem" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="login-card">
            <h3>For accident Time</h3>
            <div style={{ width: "100%" }}>
              <div className="login-field" style={formColumnStyle}>
                <label>Emergency Number</label>
                <input
                  type="number"
                  value={formStore.emergencey_phone}
                  onChange={updateField("emergencey_phone")}
                  className="form-control"
                  style={{ padding: "0.8rem 0.85rem" }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="d-flex justify-content-center align-items-center gap-2 border pt-3 pb-3 ps-4 pe-4 border-opacity-25 rounded focus-ring py-1 px-2 Icon_hover"
            >
              Submit Your Extra Information
              <Icons.upload />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Employees_side;
