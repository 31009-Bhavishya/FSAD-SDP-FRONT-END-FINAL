import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { validateLoginForm } from "../utils/validatiors";
import { BASE_URL } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setServerError("");

    // Inline validation
    const validationErrors = validateLoginForm({ email, password });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      // ✅ FETCH call to Spring Boot backend
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        setServerError(data.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      // Save session
      const user = data.user;
      if (rememberMe) localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.dispatchEvent(new Event("userLogin"));

      // Role-based redirect
      const role = user.role?.toLowerCase() || "patient";
      if (role === "doctor") {
        const doctorProfiles = JSON.parse(localStorage.getItem("doctorProfiles")) || [];
        const hasProfile = doctorProfiles.some(
          (p) => p.id === user.id || p.userId === user.id
        );
        navigate(hasProfile ? "/doctor" : "/doctor/onboarding");
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "pharmacist") {
        navigate("/pharmacist");
      } else {
        navigate("/patient/dashboard");
      }

    } catch (err) {
      // Fallback to localStorage if backend is down
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const storedUser = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!storedUser) {
        setServerError("Invalid email or password. Please try again.");
        setLoading(false);
        return;
      }
      if (rememberMe) localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(storedUser));
      window.dispatchEvent(new Event("userLogin"));

      const role = storedUser.role || "patient";
      if (role === "doctor") {
        const doctorProfiles = JSON.parse(localStorage.getItem("doctorProfiles")) || [];
        const hasProfile = doctorProfiles.some(
          (p) => p.id === storedUser.id || p.userId === storedUser.id
        );
        navigate(hasProfile ? "/doctor" : "/doctor/onboarding");
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "pharmacist") {
        navigate("/pharmacist");
      } else {
        navigate("/patient/dashboard");
      }
    }

    setLoading(false);
  }

  const handleChange = (field, value) => {
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    setServerError("");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">
            Login to continue to{" "}
            <span className="auth-subtitle__brand">MediCurex</span>
          </p>
        </div>

        {serverError && (
          <div style={{
            background: "#fee2e2", color: "#dc2626", padding: "10px 14px",
            borderRadius: "8px", marginBottom: "14px", fontSize: "13px",
          }}>
            {serverError}
          </div>
        )}

        <form className="auth-form" onSubmit={handleLogin} noValidate>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              id="email"
              type="email"
              className={`form-input${errors.email ? " input-error" : ""}`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && (
              <span style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px", display: "block" }}>
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className={`form-input${errors.password ? " input-error" : ""}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            {errors.password && (
              <span style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px", display: "block" }}>
                {errors.password}
              </span>
            )}
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox-input"
              />
              <span>Remember me</span>
            </label>
            <Link to="#" className="form-link">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            className="auth-button auth-button--primary"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register" className="auth-footer__link">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
