function Employee_Login() {
  return (
    <>
      <main className="login-page min-vh-100">
        <section className="login-shell container">
          <div className="login-visual" aria-hidden="true">
            <div className="login-brand">
              <span>EAG Church - 6 Kilo</span>
              <strong>Human Resources ERP</strong>
            </div>

            <img
              src={heroImage}
              alt=""
              className="login-hero-image"
              draggable="false"
            />

            <div className="login-status-panel">
              <p className="mb-1">Secure workspace</p>
              <strong>Employee records stay organized and ready.</strong>
            </div>
          </div>

          <form className="login-card" onSubmit={handleLogin}>
            <div className="login-card-header">
              <p className="login-eyebrow mb-2">Welcome back</p>
              <h1>Sign in to your HR workspace</h1>
              <p>
                Access employee records, attendance updates, and payroll
                preparation from one place.
              </p>
            </div>

            {errorMessage && (
              <div className="login-alert" role="alert">
                {errorMessage}
              </div>
            )}

            <div className="login-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                autoComplete="email"
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              className="btn login-submit"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            <div className="login-footer">
              <Link to="/">Back to home</Link>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
