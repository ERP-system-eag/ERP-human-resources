import { useEffect, useState } from "react";
import { useAuth } from "../../context-auth/AuthContext";
import "../dashboard/dashboard-layout.css";

function Right_bar_employee_info({ getEmployeeId, onEmployeeUpdated }) {
  const { accessToken, reloadPage } = useAuth();
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
          console.log("This profile pic: ", data);
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
        const data = await res.json();
        setChoices(data);
        console.log("Choice data: ", data);
      } catch (error) {
        //
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
        onEmployeeUpdated(updatedEmployee);
        alert("Employee updated successfully!");
        reloadPage();
      } else {
        const errData = await response.json();
        console.error("Update failed:", errData);
        alert("Failed to update employee.");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("An error occurred while updating.");
    }
  };

  return (
    <div className="Right_dashboard-sidebar border-start border-bottom rounded-bottom-1 p-3">
      <div className="dashboard-sidebar-inner">
        <h3>Edit Employee Info</h3>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div>
            <label className="form-label">Personal Photo</label>
            {previewImage && (
              <img
                src={previewImage}
                alt="Employee preview"
                className="rounded-circle mb-3"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                }}
              />
            )}
            <input
              type="file"
              name="personal_photo"
              className="form-control"
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
          <div>
            <label className="form-label">Employee ID:</label>
            <input
              type="text"
              name="employee_id"
              className="form-control"
              value={formData.employee_id}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="form-label">Phone Number:</label>
            <input
              type="number"
              name="phone_number"
              className="form-control"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="form-label">Emergency Contact:</label>
            <input
              type="number"
              name="emergency_contact"
              className="form-control"
              value={formData.emergency_contact}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="form-label">Address:</label>
            <select
              name="Address"
              className="form-control"
              value={formData.Address}
              onChange={handleChange}
            >
              <option value="">Select Your Address</option>
              {choices.address?.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Job Title:</label>
            <select
              name="job_title"
              className="form-control"
              value={formData.job_title}
              onChange={handleChange}
            >
              <option value="">Select Your Job</option>
              {choices.job_title?.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Salary:</label>
            <input
              type="number"
              step="0.01"
              name="salary"
              className="form-control"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="form-label">Hire Date:</label>
            <input
              type="date"
              name="hire_date"
              className="form-control"
              value={formData.hire_date}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="form-label">Date of Birth:</label>
            <input
              type="date"
              name="date_Of_Birth"
              className="form-control"
              value={formData.date_Of_Birth}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-2">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default Right_bar_employee_info;
