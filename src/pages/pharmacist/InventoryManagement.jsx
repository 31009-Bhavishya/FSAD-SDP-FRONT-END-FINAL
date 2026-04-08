import React, { useState } from "react";
import "./PharmacistDashboard.css";

const InventoryManagement = () => {
  const [medicines, setMedicines] = useState(JSON.parse(localStorage.getItem("medicines")) || []);
  const updateStock = (id, delta) => {
    const updated = medicines.map((item) => item.id !== id ? item : { ...item, stock: Math.max(0, Number(item.stock || 0) + delta) });
    setMedicines(updated);
    localStorage.setItem("medicines", JSON.stringify(updated));
  };

  return (
    <div className="pharmacist-page"><h1>Inventory Management</h1><div className="pharmacist-section">{medicines.length === 0 ? <p className="pharmacist-empty">Inventory is empty. Ask Admin to add medicines to the catalog.</p> : <table className="pharmacist-table"><thead><tr><th>Medicine</th><th>Current Stock</th><th>Inventory Status</th><th>Actions</th></tr></thead><tbody>{medicines.map((medicine) => { const stock = Number(medicine.stock || 0); return <tr key={medicine.id}><td>{medicine.name}</td><td>{stock}</td><td><span className={`pharmacist-badge ${stock <= 10 ? "low" : ""}`}>{stock <= 10 ? "Low Stock" : "In Stock"}</span></td><td><div className="pharmacist-actions"><button className="pharmacist-btn" onClick={() => updateStock(medicine.id, 5)}>+5</button><button className="pharmacist-btn ghost" onClick={() => updateStock(medicine.id, -1)}>-1</button></div></td></tr> })}</tbody></table>}</div></div>
  );
};

export default InventoryManagement;
