import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./PharmacistDashboard.css";

const PharmacistDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pharmacist = JSON.parse(localStorage.getItem("currentUser")) || {};

  useEffect(() => {
    if (!pharmacist?.name || pharmacist?.role !== "pharmacist") {
      navigate("/login");
    }
  }, [pharmacist?.name, pharmacist?.role, navigate]);

  const prescriptions = JSON.parse(localStorage.getItem("prescriptions")) || [];
  const medicines = JSON.parse(localStorage.getItem("medicines")) || [];
  const pharmacyOrders = JSON.parse(localStorage.getItem("pharmacyOrders")) || [];
  const pharmacistNotifications = JSON.parse(localStorage.getItem("pharmacistNotifications")) || [];
  const interactionAlerts = JSON.parse(localStorage.getItem("drugInteractionAlerts")) || [];

  const pendingPrescriptions = prescriptions.filter((item) => item.status === "pending");
  const lowStock = medicines.filter((item) => Number(item.stock || 0) <= 10);
  const activeOrders = pharmacyOrders.filter((item) => item.status !== "Delivered");
  const unreadNotifications = pharmacistNotifications.filter((item) => !item.read);
  const isChildRoute = location.pathname !== "/pharmacist" && location.pathname !== "/pharmacist/";

  return (
    <div className="pharmacist-dashboard">
      {!isChildRoute && (
        <>
          <div className="pharmacist-header">
            <div>
              <h1>Welcome, {pharmacist?.name || "Pharmacist"} 💊</h1>
              <p className="pharmacist-subtitle">
                Manage e-prescriptions, validate medication requests, monitor inventory, and keep patients informed.
              </p>
            </div>
          </div>

          <div className="pharmacist-grid">
            <Link to="e-prescriptions" className="pharmacist-card"><h3>📄 E-Prescription Management</h3><p>Review digital prescriptions, validate details, and update dispense status.</p></Link>
            <Link to="orders" className="pharmacist-card"><h3>🚚 Order Tracking</h3><p>Track medicine fulfillment, dispatch progress, and delivery milestones.</p></Link>
            <Link to="medications" className="pharmacist-card"><h3>ℹ️ Medication Information</h3><p>Maintain dosage guidance, usage notes, precautions, and side-effect visibility.</p></Link>
            <Link to="inventory" className="pharmacist-card"><h3>📦 Inventory Management</h3><p>Monitor stock levels, expiry visibility, and replenishment priorities.</p></Link>
            <Link to="alerts" className="pharmacist-card"><h3>⚠️ Drug Interaction Alerts</h3><p>Review flagged medication combinations before order fulfillment.</p></Link>
            <Link to="notifications" className="pharmacist-card"><h3>🔔 Notifications</h3><p>Stay aligned on prescription updates, stock alerts, and order exceptions.</p></Link>
          </div>

          <div className="pharmacist-stats">
            <div className="pharmacist-stat"><h3>Pending Prescriptions</h3><p>{pendingPrescriptions.length}</p></div>
            <div className="pharmacist-stat"><h3>Active Orders</h3><p>{activeOrders.length}</p></div>
            <div className="pharmacist-stat"><h3>Low Stock Items</h3><p>{lowStock.length}</p></div>
            <div className="pharmacist-stat"><h3>Unread Notifications</h3><p>{unreadNotifications.length}</p></div>
          </div>

          <div className="pharmacist-panels">
            <div className="pharmacist-panel">
              <h2>Prescription Validation Queue</h2>
              {pendingPrescriptions.length === 0 ? <p className="pharmacist-empty">No pending prescriptions require validation.</p> : (
                <table className="pharmacist-table"><thead><tr><th>Patient</th><th>Doctor</th><th>Status</th></tr></thead><tbody>{pendingPrescriptions.slice(0, 5).map((item) => (
                  <tr key={item.id}><td>{item.patientName}</td><td>{item.doctor}</td><td><span className="pharmacist-badge warning">{item.status}</span></td></tr>
                ))}</tbody></table>
              )}
            </div>

            <div className="pharmacist-panel">
              <h2>Operational Alerts</h2>
              <ul className="pharmacist-list">
                {interactionAlerts.slice(0, 3).map((item) => <li key={item.id}><strong>{item.title}</strong><br />{item.message}</li>)}
                {lowStock.slice(0, 2).map((item) => <li key={item.id}><strong>Low stock:</strong> {item.name} has only {item.stock || 0} units remaining.</li>)}
                {interactionAlerts.length === 0 && lowStock.length === 0 && <li>All critical alerts are currently under control.</li>}
              </ul>
            </div>
          </div>
        </>
      )}
      <Outlet />
    </div>
  );
};

export default PharmacistDashboard;
