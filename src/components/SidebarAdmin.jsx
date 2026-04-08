import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SidebarAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    window.dispatchEvent(new Event("userLogout"));
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <nav className="sidebar-nav">
        <NavLink to="/admin/dashboard" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
          📊 Dashboard
        </NavLink>
        <NavLink to="/admin/users" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
          👥 Manage Users
        </NavLink>
        <NavLink to="/admin/medicines" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
          💊 Medicines
        </NavLink>
        <NavLink to="/admin/orders" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
          📦 Orders
        </NavLink>
        <NavLink to="/admin/reports" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
          📄 Reports
        </NavLink>
      </nav>
      <button className="sidebar-logout" onClick={handleLogout}>
        🚪 Logout
      </button>
    </aside>
  );
};

export default SidebarAdmin;
