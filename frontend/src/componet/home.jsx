import heroImage from "../assets/hero.png";
import "./home.css";

import { Link } from "react-router-dom";

const highlights = [
  {
    title: "Employee Records",
    description:
      "Keep staff profiles, roles, and contact details easy to find.",
  },
  {
    title: "Attendance Tracking",
    description:
      "Monitor daily presence and follow up on missing reports faster.",
  },
  {
    title: "Payroll Support",
    description:
      "Prepare salary information with cleaner, more reliable HR data.",
  },
];

function Home() {
  return (
    <main className="home-page w-100 min-vh-100">
      <section className="container py-5">
        <nav className="home-nav d-flex align-items-center justify-content-between mb-5">
          <div>
            <p className="home-kicker mb-1">EAG Church - 6 Kilo</p>
            <p className="home-brand mb-0">Human Resources ERP</p>
          </div>

          <a className="home-nav-link" href="#overview">
            Overview
          </a>
        </nav>

        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <p className="home-eyebrow mb-3">Central HR workspace</p>
            <h1 className="home-title mb-4">
              Manage people, records, and HR work with confidence.
            </h1>
            <p className="home-lead mb-4">
              A simple ERP home for organizing employee information, attendance,
              payroll preparation, and day-to-day HR tasks for the Ethiopian
              Assemblies of God Church 6 Kilo team.
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
              <Link
                to={"/login"}
                className="btn btn-dark home-action"
                href="#overview"
              >
                Get started
              </Link>
              <a className="btn btn-outline-dark home-action" href="#features">
                View features
              </a>
            </div>

            <div className="home-metrics d-grid gap-3">
              <div>
                <strong>24/7</strong>
                <span>Accessible HR records</span>
              </div>
              <div>
                <strong>3</strong>
                <span>Core HR workflows</span>
              </div>
              <div>
                <strong>1</strong>
                <span>Organized workspace</span>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="home-visual">
              <img
                src={heroImage}
                alt="Layered ERP platform illustration"
                className="home-hero-image"
              />
              <div className="home-focus-card" id="overview">
                <p className="home-focus-label mb-2">Today&apos;s focus</p>
                <h2 className="home-focus-title mb-3">
                  Keep HR operations clear and accountable.
                </h2>
                <ul className="home-task-list">
                  <li>Review attendance updates</li>
                  <li>Update employee profiles</li>
                  <li>Prepare payroll information</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="home-feature-grid row g-4" id="features">
          {highlights.map((item) => (
            <div className="col-md-4" key={item.title}>
              <article className="home-feature-card h-100">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
