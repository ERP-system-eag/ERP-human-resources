import { Link } from "react-router-dom";
import { Icons } from "../../assets/Icons/icons";

function Profile({
  employeeProfile,
  letComplateProfile,
  employeeData,
  setEmployee,
}) {
  // console.log("This is user Profile image: ", employeeProfile);

  return (
    <>
      <div>
        <div>
          <img
            src="https://img.magnific.com/free-photo/vivid-blurred-colorful-background_58702-2545.jpg?t=st=1790158864~exp=1790162464~hmac=73367b872d32c679afd0199e214f06e6bd7ce8c2c44ad028bcf77109b60179ba&w=2000"
            alt=""
            className="w-100"
            style={{ height: "280px" }}
          />
        </div>
        <div className="d-flex p-4">
          <div className="profile_info overflow-hidden">
            <img
              src={
                employeeProfile?.personal_photo
                  ? `http://127.0.0.1:8000${employeeProfile.personal_photo}`
                  : null
              }
              className="Profile_Image"
              alt="Profile Image"
            />
          </div>
          <div className="p-4">
            <h1 className="fw-bolder fs-2">
              {employeeProfile.first_name} {employeeProfile.grandfather_name}
            </h1>
            <div>
              {letComplateProfile && (
                <button
                  onClick={() => {
                    setEmployee("Employees");
                  }}
                  className="border p-2 rounded fw-bolder d-flex justify-content-center align-items-center gap-2"
                >
                  Complete Your Profile
                  <Icons.edit />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
