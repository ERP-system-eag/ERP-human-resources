function MainNav({ username }) {
  return (
    <nav className="dashboard-top-nav" aria-label="Dashboard navigation">
      <div className="dashboard-top-nav-title">
        <h3>Main Nav</h3>
        {username ? <p>{username}</p> : null}
      </div>

      <div className="dashboard-top-nav-actions" aria-hidden="true">
        <div className="dashboard-search-placeholder" />
        <div className="dashboard-avatar-placeholder" />
      </div>
    </nav>
  );
}

export default MainNav;
