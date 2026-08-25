// login.jsx
import React, { useState } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelLogin = async (e) => {
    e.preventDefault();

    try {
      const respones = fetch("http://127.0.0.1:8000/api/users/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await respones.json();
      if (!respones.ok) {
        console.error(data);
      }

      // save token
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      // redirect page
      navigate("/");
    } catch (error) {
      console.log("Login Error: ", error);
    }
  };
  return (
    <>
      {/* Bootstrap classes for centering and background */}
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        {/* Bootstrap card for the login form */}
        <form
          className="card p-4 shadow-sm"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h2 className="text-center mb-4">Login</h2>{" "}
          {/* Bootstrap classes for heading */}
          <div className="mb-3">
            {" "}
            {/* Bootstrap class for margin-bottom */}
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="form-control" // Bootstrap class for input fields
            />
          </div>
          <div className="mb-3">
            {" "}
            {/* Bootstrap class for margin-bottom */}
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              className="form-control" // Bootstrap class for input fields
            />
          </div>
          {/* Bootstrap classes for button */}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </>
  );
};
export default Login;
