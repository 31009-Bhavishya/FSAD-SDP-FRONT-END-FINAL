import React, { useState } from "react";
import "./PharmacistDashboard.css";

const defaultOrders = [
  { id: "ORD-1001", patientName: "Aarav Sharma", medicine: "Paracetamol", status: "Processing", eta: "Today, 6:00 PM" },
  { id: "ORD-1002", patientName: "Neha Patel", medicine: "Amoxicillin", status: "Packed", eta: "Tomorrow, 10:00 AM" },
  { id: "ORD-1003", patientName: "Rohan Verma", medicine: "Vitamin D3", status: "Delivered", eta: "Completed" },
];

const OrderTracking = () => {
  const storedOrders = JSON.parse(localStorage.getItem("pharmacyOrders")) || defaultOrders;
  const [orders, setOrders] = useState(storedOrders);

  const updateOrder = (id, status) => {
    const updated = orders.map((item) => item.id === id ? { ...item, status } : item);
    setOrders(updated);
    localStorage.setItem("pharmacyOrders", JSON.stringify(updated));
  };

  return (
    <div className="pharmacist-page"><h1>Order Tracking</h1><div className="pharmacist-section"><table className="pharmacist-table"><thead><tr><th>Order ID</th><th>Patient</th><th>Medicine</th><th>Status</th><th>ETA</th><th>Update</th></tr></thead><tbody>{orders.map((order) => (<tr key={order.id}><td>{order.id}</td><td>{order.patientName}</td><td>{order.medicine}</td><td><span className="pharmacist-badge">{order.status}</span></td><td>{order.eta}</td><td><div className="pharmacist-actions"><button className="pharmacist-btn" onClick={() => updateOrder(order.id, "Packed")}>Packed</button><button className="pharmacist-btn secondary" onClick={() => updateOrder(order.id, "Out for Delivery")}>Dispatch</button><button className="pharmacist-btn ghost" onClick={() => updateOrder(order.id, "Delivered")}>Delivered</button></div></td></tr>))}</tbody></table></div></div>
  );
};

export default OrderTracking;
