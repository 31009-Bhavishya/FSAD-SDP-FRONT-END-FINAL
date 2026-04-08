import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./PatientDashboard.css";

function PatientDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    window.dispatchEvent(new Event("userLogout"));
    navigate("/login");
  };

  if (!user || user.role !== "patient") {
    navigate("/login");
    return null;
  }

  return (
    <>
      {/* ===== DASHBOARD FEATURE BOXES ===== */}
      <section className="patient-dashboard">
        <div className="dashboard-header">
          <h2>Welcome, {user?.name || "Patient"}</h2>
          <button
            onClick={logout}
            style={{
              padding: "8px 16px",
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Logout
          </button>
        </div>

        <div className="dashboard-boxes">

          <Link to="/patient/book-appointment" className="dashboard-box">
            <h3>🩺 Book Appointment</h3>
            <p>Find doctors and schedule appointments efficiently</p>
          </Link>

          <Link to="/patient/my-appointment" className="dashboard-box">
            <h3>📅 My Appointments</h3>
            <p>Track upcoming and past appointments</p>
          </Link>

          <Link to="/patient/chat" className="dashboard-box">
            <h3>💬 Chat with Doctor</h3>
            <p>Connect with doctors through secure chat</p>
          </Link>

          <Link to="/patient/pharmacy" className="dashboard-box">
            <h3>💊 Pharmacy</h3>
            <p>Browse medicines and place pharmacy orders</p>
          </Link>

          <Link to="/patient/prescription" className="dashboard-box">
            <h3>📝 Prescription</h3>
            <p>Access your latest prescription details</p>
          </Link>

        </div>
      </section>

      {/* ===== PAGE CONTENT OPENS HERE ===== */}
      <section className="patient-page-content">
        <Outlet />
      </section>
    </>
  );
}

export default PatientDashboard;
