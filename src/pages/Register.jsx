import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import { validateRegisterForm } from "../utils/validatiors";
import { BASE_URL } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    const setters = {
      name: setName,
      email: setEmail,
      password: setPassword,
      confirmPassword: setConfirmPassword,
    };
    setters[field]?.(value);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    setServerError("");
  };

  async function handleRegister(e) {
    e.preventDefault();
    setServerError("");

    
    const validationErrors = validateRegisterForm({ name, email, password, confirmPassword });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (!data.success) {
        setServerError(data.message || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const newUser = {
        id: Date.now().toString(),
        name, email, password, role,
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Registration Successful! You can now Login to MediCurex");
      navigate("/login");

    } catch (err) {
      
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const emailExists = users.some((u) => u.email === email);
      if (emailExists) {
        setServerError("Email already registered. Please use a different email or login.");
        setLoading(false);
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        name, email, password, role,
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Registration Successful! You can now Login to MediCurex");
      navigate("/login");
    }

    setLoading(false);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">
            Join <span className="auth-subtitle__brand">MediCurex</span> today
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

        <form className="auth-form" onSubmit={handleRegister} noValidate>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              id="name"
              type="text"
              className={`form-input${errors.name ? " input-error" : ""}`}
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && (
              <span style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px", display: "block" }}>
                {errors.name}
              </span>
            )}
          </div>

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
            <label className="form-label">Register As</label>
            <select
              className="form-input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
              <option value="pharmacist">Pharmacist</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className={`form-input${errors.password ? " input-error" : ""}`}
              placeholder="Create a password (min 6 characters)"
              value={password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            {errors.password && (
              <span style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px", display: "block" }}>
                {errors.password}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              className={`form-input${errors.confirmPassword ? " input-error" : ""}`}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
            />
            {errors.confirmPassword && (
              <span style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px", display: "block" }}>
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="auth-button auth-button--primary"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-footer__link">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
