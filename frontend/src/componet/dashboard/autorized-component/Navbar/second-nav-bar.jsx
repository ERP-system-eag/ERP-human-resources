import { Icons } from "../../../../assets/Icons/icons";

function MainNav() {
  return (
    <nav className="dashboard-top-nav" aria-label="Dashboard navigation">
      <div
        className="dashboard-top-nav-actions dashboard-nav-icon-actions"
        aria-label="Notifications"
      >
        {/* {[Icons.message, Icons.alert, Icons.gift].map((Icon, index) => (
          <button className={`dashboard-nav-icon ${index === 0 ? "dashboard-nav-icon--message" : ""}`} type="button" key={index} aria-label={["Messages", "Alerts", "Gifts"][index]}>
            <Icon />
            {index === 0 && <span className="dashboard-nav-icon__badge" aria-label="Unread messages" />}
          </button>
        ))} */}
        <div className="d-flex justify-content center align-items-center gap-4">
          <button
            type="button"
            class="border-1 border-success border-opacity-50 p-2 rounded-circle position-relative"
          >
            <p className="text-green-700 m-0">
              <Icons.message />
            </p>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
              4<span class="visually-hidden">unread messages</span>
            </span>
          </button>

          <button
            type="button"
            class="border-1 border-success border-opacity-50 p-2 rounded-circle position-relative"
          >
            <p className="text-green-700 m-0">
              <Icons.gift />
            </p>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
              2<span class="visually-hidden">unread messages</span>
            </span>
          </button>

          <button
            type="button"
            class="border-1 border-success border-opacity-5 p-2 rounded-circle position-relative"
          >
            <p className="text-green-700 m-0">
              <Icons.alert />
            </p>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
              8<span class="visually-hidden">unread messages</span>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default MainNav;
