import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SidebarDoctor = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    window.dispatchEvent(new Event("userLogout"));
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Doctor Panel</h2>
      <nav className="sidebar-nav">
        <NavLink to="/doctor" end className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
          🏠 Dashboard
        </NavLink>
        <NavLink to="/doctor/appointments" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
          📅 Appointments
        </NavLink>
        <NavLink to="/doctor/patients" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
          👥 My Patients
        </NavLink>
        <NavLink to="/doctor/prescription" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
          📝 Prescriptions
        </NavLink>
        <NavLink to="/doctor/chat" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
          💬 Chat
        </NavLink>
      </nav>
      <button className="sidebar-logout" onClick={handleLogout}>
        🚪 Logout
      </button>
    </aside>
  );
};

export default SidebarDoctor;
