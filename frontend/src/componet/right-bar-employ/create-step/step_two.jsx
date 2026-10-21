import { Icons } from "../../../assets/Icons/icons";

function StepTwoEmployee({
  setSelectedImage,
  setPreviewImage,
  handleSubmit,
  previewImage,
  handleChange,
  formData,
  loading,
  choices,
  AddEmployee,
}) {
  return (
    <>
      <div>
        <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
          <div>
            <h4 className="fw-bold m-0" style={{ fontSize: "1.1rem" }}>
              Add New Employee
            </h4>
            <small className="text-muted">
              Enter employee details and record
            </small>
          </div>
          <span className="badge bg-success text-white">New</span>
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
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
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
              <label className="form-label small fw-semibold">
                Employee ID *
              </label>
              <input
                type="text"
                name="employee_id"
                className="form-control form-control-sm"
                value={formData.employee_id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-6">
              <label className="form-label small fw-semibold">
                Phone Number
              </label>
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
              <label className="form-label small fw-semibold">
                Emergency Contact
              </label>
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
              <label className="form-label small fw-semibold">
                Date of Birth
              </label>
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
            className="btn btn-success btn-sm w-100 py-2 mt-2 d-flex align-items-center justify-content-center gap-2 shadow-sm"
            disabled={loading}
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <Icons.plus size={16} />
            )}
            Create Employee
          </button>
        </form>
      </div>
    </>
  );
}

export default StepTwoEmployee;
