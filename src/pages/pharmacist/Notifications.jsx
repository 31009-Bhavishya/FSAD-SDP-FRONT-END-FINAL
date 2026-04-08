import React, { useState } from "react";
import "./PharmacistDashboard.css";

const defaultNotifications = [
  { id: 1, title: "New e-prescription received", message: "A new prescription is ready for validation.", createdAt: new Date().toLocaleString(), read: false },
  { id: 2, title: "Inventory threshold alert", message: "Paracetamol stock is approaching the minimum level.", createdAt: new Date().toLocaleString(), read: false },
];

const Notifications = () => {
  const stored = JSON.parse(localStorage.getItem("pharmacistNotifications")) || defaultNotifications;
  const [notifications, setNotifications] = useState(stored);
  const markAllAsRead = () => {
    const updated = notifications.map((item) => ({ ...item, read: true }));
    setNotifications(updated);
    localStorage.setItem("pharmacistNotifications", JSON.stringify(updated));
  };

  return <div className="pharmacist-page"><h1>Notifications</h1><div className="pharmacist-section"><button className="pharmacist-btn" onClick={markAllAsRead}>Mark all as read</button></div><div className="pharmacist-section"><ul className="pharmacist-list">{notifications.map((notification) => <li key={notification.id}><strong>{notification.title}</strong><div>{notification.message}</div><small>{notification.createdAt}</small><div style={{ marginTop: 8 }}><span className={`pharmacist-badge ${notification.read ? "" : "warning"}`}>{notification.read ? "Read" : "Unread"}</span></div></li>)}</ul></div></div>;
};

export default Notifications;
