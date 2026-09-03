function Mainbody() {
  return (
    <main className="dashboard-main">
      <div className="dashboard-card-grid">
        {["Employees", "Departments", "Requests", "Reports"].map((item) => (
          <section className="dashboard-stat-card" key={item}>
            <p>{item}</p>
            <h2>0</h2>
          </section>
        ))}
      </div>

      <section className="dashboard-panel">
        <h1>This is Main Body</h1>
        <p>
          Dashboard content can grow here without pushing the sidebar or top
          navigation out of alignment.
        </p>
      </section>
    </main>
  );
}

export default Mainbody;
