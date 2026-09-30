import { Icons } from "../../assets/Icons/icons";
import "./profile.css";

function Profile({
  employeeProfile,
  letComplateProfile,
  setEmployee,
  complated,
  employeData,
}) {
  const firstName = employeeProfile?.first_name ?? "";
  const lastName = employeeProfile?.last_name ?? "";
  const grandfatherName = employeeProfile?.grandfather_name ?? "";
  const fullName = [firstName, lastName, grandfatherName]
    .filter(Boolean)
    .join(" ");
  const initials = fullName
    .split(/\s+/)
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const status = complated?.employer_status;
  const statusLabel = status === "Unavailabel" ? "Unavailable" : status;

  // Gender filter
  const GenderFilter = employeData.gender;
  const handelGender = () => {
    if (GenderFilter === "Male") {
      return <h1>Mr. {fullName || "Employee profile"}</h1>;
    } else {
      return <h1>Ms. {fullName || "Employee profile"}</h1>;
    }
  };

  return (
    <section className="employee-profile" aria-label="Employee profile">
      <div className="employee-profile__cover" aria-hidden="true">
        <span className="employee-profile__cover-label">EAG · PEOPLE</span>
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
            <p className="employee-profile__organization">EAG ERP System</p>
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
          <div>
            <span className="employee-profile__detail-label">Position</span>
            <span className="employee-profile__detail-value">
              {complated?.job_title || "Not set"}
            </span>
          </div>
          <div>
            <span className="employee-profile__detail-label">Phone</span>
            <span className="employee-profile__detail-value">
              {complated?.phone_number
                ? `+251 ${complated.phone_number}`
                : "Not set"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
