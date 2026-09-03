import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "../../assets/hero.png";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const getLoginError = (data) => {
    if (data?.detail) {
      return data.detail;
    }

    if (Array.isArray(data?.non_field_errors)) {
      return data.non_field_errors.join(" ");
    }

    return "We could not sign you in. Please check your email and password.";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/users/auth/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorMessage(getLoginError(data));
        return;
      }

      // Save tokens
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      console.log("Access Token:", localStorage.getItem("access_token"));
      console.log("Refresh Token:", localStorage.getItem("refresh_token"));

      const meResponse = await fetch(
        "http://127.0.0.1:8000/api/users/auth/me",
        {
          headers: {
            Authorization: `Bearer ${data.access}`,
          },
        },
      );

      // recieve data
      const user = await meResponse.json();

      if (!meResponse.ok) {
        setErrorMessage("Could not load user information.");
        return;
      }

      // Redirect page
      navigate(`/autorized/${user.firstname}-${user.lastname}`);
    } catch (error) {
      console.log("Login Error:", error);
      setErrorMessage("The server is not responding. Please try again soon.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
};

export default Login;
