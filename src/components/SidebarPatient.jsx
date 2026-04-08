import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SidebarPatient = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    window.dispatchEvent(new Event("userLogout"));
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Patient Panel</h2>
      <nav className="sidebar-nav">
        <NavLink to="/patient" end className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
          🏠 Dashboard
        </NavLink>
        <NavLink to="/patient/book-appointment" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
          🩺 Book Appointment
        </NavLink>
        <NavLink to="/patient/my-appointment" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
          📅 My Appointments
        </NavLink>
        <NavLink to="/patient/chat" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
          💬 Chat with Doctor
        </NavLink>
        <NavLink to="/patient/pharmacy" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
          💊 Pharmacy
        </NavLink>
        <NavLink to="/patient/prescription" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
          📝 Prescription
        </NavLink>
      </nav>
      <button className="sidebar-logout" onClick={handleLogout}>
        🚪 Logout
      </button>
    </aside>
  );
};

export default SidebarPatient;
