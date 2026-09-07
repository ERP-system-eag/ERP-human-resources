import { Icons } from "../../../../assets/Icons/icons";
import { useAuth } from "../../../../context-auth/AuthContext";

function MainNav({ username, employee }) {
  const { user, logout } = useAuth();

  return (
    <nav className="dashboard-top-nav" aria-label="Dashboard navigation">
      <div className="dashboard-top-nav-title">
        <h3>{employee}</h3>
        {username ? <p>{username}</p> : null}
      </div>

      <div className="dashboard-top-nav-actions" aria-hidden="true">
        {user.is_admin && (
          <div className="dashboard-search-placeholder d-flex justify-content-center align-items-center text-center gap-2">
            <Icons.admin className="d-flex justify-content-center align-items-center" />
            <p className="fw-bolder m-0 text-success">Administrator</p>
          </div>
        )}
        <div className="dashboard-avatar-placeholder"></div>
        <button
          onClick={logout}
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
