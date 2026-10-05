import { Icons } from "../../assets/Icons/icons";
import "./profile.css";

function Profile({
  employeeProfile,
  letComplateProfile,
  setEmployee,
  complated,
  employeData,
}) {
  const firstName = employeData?.first_name ?? "";
  const lastName = employeData?.last_name ?? "";
  const grandfatherName = employeData?.grandfather_name ?? "";
  const fullName = [firstName, lastName, grandfatherName]
    .filter(Boolean)
    .join(" ");
  const initials = fullName
    .split(/\s+/)
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const status = employeeProfile?.employer_status;
  const statusLabel = status === "Unavailabel" ? "Unavailable" : status;

  // Date Format
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Gender filter
  const GenderFilter = employeeProfile.gender;
  // console.log(employeeProfile);
  const handelGender = () => {
    if (GenderFilter === "Male") {
      return (
        <h1 style={{ fontSize: "30px" }}>
          Mr. {fullName || "Employee profile"}
        </h1>
      );
    } else {
      return (
        <h1 style={{ fontSize: "30px" }}>
          Ms. {fullName || "Employee profile"}
        </h1>
      );
    }
  };
  // console.log("Profile complate: ", employeData);
  return (
    <section className="employee-profile" aria-label="Employee profile">
      <div className="employee-profile__cover" aria-hidden="true">
        <span className="employee-profile__cover-label text-dark">
          {employeeProfile.employee_id}
        </span>
      </div>

      <div className="employee-profile__body">
        <div className="employee-profile__identity">
          <div
            className="employee-profile__avatar z-3"
            aria-hidden={!employeeProfile?.personal_photo}
          >
            {employeeProfile?.personal_photo ? (
              <img
                src={`http://127.0.0.1:8000${employeeProfile.personal_photo}`}
                alt={`${fullName || "Employee"} profile`}
              />
            ) : (
              <span aria-hidden="true">{initials || "E"}</span>
            )}
          </div>

          <div className="employee-profile__identity-copy">
            <div className="employee-profile__name-line">
              <h1>{handelGender()}</h1>
              {statusLabel && (
                <span
                  className={`employee-profile__status ${status === "On Work" ? "is-active" : "is-inactive"}`}
                >
                  <span aria-hidden="true" />
                  {statusLabel}
                </span>
              )}
            </div>
            <div className="opacity-50">
              <p className="employee-profile__detail-label">
                <span className="fw-bold" style={{ fontSize: "20px" }}>
                  {employeeProfile?.job_title || "Not set"}
                </span>{" "}
                of EAG ERP System
              </p>
            </div>
          </div>

          {letComplateProfile && (
            <button
              type="button"
              onClick={() => setEmployee("Employees")}
              className="employee-profile__complete"
            >
              <Icons.edit aria-hidden="true" />
              <span>Complete profile</span>
            </button>
          )}
        </div>

        <div
          className="employee-profile__details"
          aria-label="Employee details"
        >
          <div className="p-4 border rounded shadow-sm">
            <div className="">
              <h1>Personal Inforamtion's</h1>
            </div>
            <div className="w-100 pt-4 d-flex flex-col gap-2 opacity-50">
              <div className="w-100 d-flex justify-content-between">
                <span className="employee-profile__detail-label">Email:</span>
                <span className="employee-profile__detail-value">
                  {employeeProfile.email}
                </span>
              </div>

              <div className="w-100 d-flex justify-content-between">
                <span className="employee-profile__detail-label">Phone: </span>
                <span className="employee-profile__detail-value">
                  {employeeProfile?.phone_number
                    ? `+251 ${employeeProfile.phone_number}`
                    : "Not set"}
                </span>
              </div>

              <div className="w-100 d-flex justify-content-between">
                <span className="employee-profile__detail-label">Address:</span>
                <span className="employee-profile__detail-value">
                  {employeeProfile.Address}
                </span>
              </div>

              <div className="w-100 d-flex justify-content-between">
                <span className="employee-profile__detail-label">Phone: </span>
                <span className="employee-profile__detail-value">
                  {employeeProfile?.emergency_contact
                    ? `+251 ${employeeProfile.emergency_contact}`
                    : "Not set"}
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 border rounded shadow-sm">
            <div className="">
              <h1>Job Information's</h1>
            </div>
            <div className="w-100 pt-4 d-flex flex-col gap-2 opacity-50">
              <div className="w-100 d-flex justify-content-between">
                <span className="employee-profile__detail-label">
                  Employee ID:
                </span>
                <span className="employee-profile__detail-value">
                  {employeeProfile.employee_id}
                </span>
              </div>

              <div className="w-100 d-flex justify-content-between">
                <span className="employee-profile__detail-label">
                  Position:
                </span>
                <span className="employee-profile__detail-value">
                  {employeeProfile.job_title}
                </span>
              </div>

              <div className="w-100 d-flex justify-content-between">
                <span className="employee-profile__detail-label">
                  Employment status:
                </span>
                <span className="employee-profile__detail-value">
                  {employeeProfile.employer_status}
                </span>
              </div>

              <div className="w-100 d-flex justify-content-between">
                <span className="employee-profile__detail-label">
                  Hire date:
                </span>
                <span className="employee-profile__detail-value">
                  {formatDate(employeeProfile?.hire_date)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
