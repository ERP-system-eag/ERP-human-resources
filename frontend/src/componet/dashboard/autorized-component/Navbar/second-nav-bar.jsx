import { useEffect } from "react";
import { Icons } from "../../../../assets/Icons/icons";
import { useAuth } from "../../../../context-auth/AuthContext";
import { useNavigate } from "react-router-dom";

function MainNav({ username, employee, employeeProfile }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate("");

  const handelLogout = () => {
    logout();
    navigate("/login");
  };

  // console.log("This is employeeProfile", employeeProfile);

  return (
    <nav className="dashboard-top-nav" aria-label="Dashboard navigation">
      <div className="dashboard-top-nav-title">
        <h3>{employee}</h3>
        {username ? <p>{username}</p> : null}
      </div>

      <div className="dashboard-top-nav-actions" aria-hidden="true">
        {user?.is_admin && (
          <div className="dashboard-search-placeholder d-flex justify-content-center align-items-center text-center gap-2">
            <Icons.admin className="d-flex justify-content-center align-items-center" />
            <p className="fw-bolder m-0 text-success">Administrator</p>
          </div>
        )}
        <div className="dashboard-avatar-placeholder w-20 h-20 overflow-hidden rounded-circle">
          <img
            src={
              employeeProfile?.personal_photo
                ? `http://127.0.0.1:8000${employeeProfile.personal_photo}`
                : null
            }
            alt="Profile"
          />
        </div>
        <button
          onClick={handelLogout}
          className="btn btn-secondary fw-bolder d-flex justify-content-center align-items-center gap-2"
        >
          Logout
          <Icons.right_arrow />
        </button>
      </div>
    </nav>
  );
}

export default MainNav;
