import React from "react";
import "./PharmacistDashboard.css";

const MedicationInformation = () => {
  const medicines = JSON.parse(localStorage.getItem("medicines")) || [];
  return (
    <div className="pharmacist-page">
      <h1>Medication Information</h1>
      <div className="pharmacist-section"><p>Maintain clear medication guidance covering dosage, administration instructions, precautions, and patient counselling notes.</p></div>
      <div className="pharmacist-section">{medicines.length === 0 ? <p className="pharmacist-empty">No medication master data is currently available.</p> : <table className="pharmacist-table"><thead><tr><th>Medicine</th><th>Price</th><th>Stock</th><th>Professional Guidance</th></tr></thead><tbody>{medicines.map((medicine) => <tr key={medicine.id}><td>{medicine.name}</td><td>₹{medicine.price}</td><td>{medicine.stock || 0}</td><td>Use as prescribed. Confirm allergies, dosage schedule, and therapy duration before dispensing.</td></tr>)}</tbody></table>}</div>
    </div>
  );
};

export default MedicationInformation;
