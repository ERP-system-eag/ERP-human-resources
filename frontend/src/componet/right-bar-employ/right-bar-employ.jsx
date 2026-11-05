import { useEffect, useState } from "react";
import { useAuth } from "../../context-auth/AuthContext";
import { Icons } from "../../assets/Icons/icons";
import { toast } from "react-toastify";
import "../dashboard/dashboard-layout.css";

function Right_bar_employee_info({ getEmployeeId, onEmployeeUpdated }) {
  const { accessToken, reloadPage } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone_number: "",
    Address: "",
    emergency_contact: "",
    employee_id: "",
    job_title: "",
    hire_date: "",
    employer_status: "",
    salary: "",
    date_Of_Birth: "",
    gender: "",
  });

  const [choices, setChoices] = useState({
    job_title: [],
    gender: [],
    address: [],
    employer_status: [],
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // Fetch old employee data and populate form state
  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (!getEmployeeId || !accessToken) return;
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/employee/auth/profile/employee-detail/${getEmployeeId}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setFormData({
            phone_number: data.phone_number ?? "",
            Address: data.Address ?? "",
            emergency_contact: data.emergency_contact ?? "",
            employee_id: data.employee_id ?? "",
            job_title: data.job_title ?? "",
            hire_date: data.hire_date ?? "",
            employer_status: data.employer_status ?? "",
            salary: data.salary ?? "",
            date_Of_Birth: data.date_Of_Birth ?? "",
            gender: data.gender ?? "",
            personal_photo: data.personal_photo ?? "",
          });
          setPreviewImage(
            data.personal_photo
              ? data.personal_photo.startsWith("http")
                ? data.personal_photo
                : `http://127.0.0.1:8000${data.personal_photo}`
              : "",
          );
        }
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [accessToken, getEmployeeId]);

  // get choices info
  useEffect(() => {
    const getChoice = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/api/employee/auth/choices",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (res.ok) {
          const data = await res.json();
          setChoices(data);
        }
      } catch (error) {
        console.error("Failed to fetch choices:", error);
      }
    };
    if (accessToken) {
      getChoice();
    }
  }, [accessToken]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit Update function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!getEmployeeId || !accessToken) return;

    setLoading(true);
    try {
      const payload = new FormData();
      if (selectedImage) {
        payload.append("personal_photo", selectedImage);
      }

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          payload.append(key, value);
        }
      });
      const response = await fetch(
        `http://127.0.0.1:8000/api/employee/auth/profile/employee-update/${getEmployeeId}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: payload,
        },
      );

      if (response.ok) {
        const updatedEmployee = await response.json();
        if (onEmployeeUpdated) {
          onEmployeeUpdated(updatedEmployee);
        }
        toast.success("Employee updated successfully!");
        setTimeout(() => {
          reloadPage();
        }, 1500);
      } else {
        const errData = await response.json();
        console.error("Update failed:", errData);
        toast.error("Failed to update employee.");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("An error occurred while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Right_dashboard-sidebar border-start border-bottom rounded-bottom-1 p-3">
      <div className="dashboard-sidebar-inner px-2">
        <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
          <div>
            <h4 className="fw-bold m-0" style={{ fontSize: "1.1rem" }}>Edit Employee</h4>
            <small className="text-muted">Update employee profile & details</small>
          </div>
          <span className="badge bg-light text-dark border">ID: {formData.employee_id || getEmployeeId}</span>
        </div>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 pb-4">
          {/* Photo Upload Section */}
          <div className="card p-3 bg-light border-0 shadow-sm text-center">
            <label className="form-label fw-semibold mb-2">Profile Photo</label>
            <div className="d-flex flex-column align-items-center gap-2">
              <div
                className="rounded-circle overflow-hidden border shadow-sm bg-white d-flex align-items-center justify-content-center"
                style={{ width: "90px", height: "90px" }}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Employee preview"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Icons.admin size={36} className="text-secondary" />
                )}
              </div>
              <input
                type="file"
                name="personal_photo"
                className="form-control form-control-sm mt-1"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setSelectedImage(file);
                    setPreviewImage(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
          </div>

          {/* Employee ID & Phone */}
          <div className="row g-2">
            <div className="col-6">
              <label className="form-label small fw-semibold">Employee ID</label>
              <input
                type="text"
                name="employee_id"
                className="form-control form-control-sm"
                value={formData.employee_id}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label className="form-label small fw-semibold">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                className="form-control form-control-sm"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Emergency Contact & Salary */}
          <div className="row g-2">
            <div className="col-6">
              <label className="form-label small fw-semibold">Emergency Contact</label>
              <input
                type="text"
                name="emergency_contact"
                className="form-control form-control-sm"
                value={formData.emergency_contact}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label className="form-label small fw-semibold">Salary</label>
              <input
                type="number"
                step="0.01"
                name="salary"
                className="form-control form-control-sm"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Job Title & Employer Status */}
          <div className="row g-2">
            <div className="col-6">
              <label className="form-label small fw-semibold">Job Title</label>
              <select
                name="job_title"
                className="form-select form-select-sm"
                value={formData.job_title}
                onChange={handleChange}
              >
                <option value="">Select Job</option>
                {choices.job_title?.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label className="form-label small fw-semibold">Status</label>
              <select
                name="employer_status"
                className="form-select form-select-sm"
                value={formData.employer_status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                {choices.employer_status?.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Address & Gender */}
          <div className="row g-2">
            <div className="col-6">
              <label className="form-label small fw-semibold">Address</label>
              <select
                name="Address"
                className="form-select form-select-sm"
                value={formData.Address}
                onChange={handleChange}
              >
                <option value="">Select Address</option>
                {choices.address?.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label className="form-label small fw-semibold">Gender</label>
              <select
                name="gender"
                className="form-select form-select-sm"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                {choices.gender?.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hire Date & Date of Birth */}
          <div className="row g-2">
            <div className="col-6">
              <label className="form-label small fw-semibold">Hire Date</label>
              <input
                type="date"
                name="hire_date"
                className="form-control form-control-sm"
                value={formData.hire_date}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label className="form-label small fw-semibold">Date of Birth</label>
              <input
                type="date"
                name="date_Of_Birth"
                className="form-control form-control-sm"
                value={formData.date_Of_Birth}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-sm w-100 py-2 mt-2 d-flex align-items-center justify-content-center gap-2 shadow-sm"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              <Icons.upload size={16} />
            )}
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default Right_bar_employee_info;
