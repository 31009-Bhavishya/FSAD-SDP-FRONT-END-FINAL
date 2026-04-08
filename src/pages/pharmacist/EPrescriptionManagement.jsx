import React, { useMemo, useState } from "react";
import "./PharmacistDashboard.css";

const EPrescriptionManagement = () => {
  const singlePrescription = JSON.parse(localStorage.getItem("prescription"));
  const existing = JSON.parse(localStorage.getItem("prescriptions")) || [];
  const normalizedSingle = useMemo(() => {
    if (!singlePrescription) return null;
    return {
      id: `rx-${Date.now()}`,
      patientName: singlePrescription.patientName || "Unknown Patient",
      diagnosis: singlePrescription.diagnosis || "Not specified",
      medicines: singlePrescription.medicines || [],
      doctor: singlePrescription.doctor || "Assigned Doctor",
      date: singlePrescription.date || new Date().toLocaleDateString(),
      status: "pending",
      validationNotes: "",
    };
  }, [singlePrescription]);

  const uniquePrescriptions = existing.length ? existing : normalizedSingle ? [normalizedSingle] : [];
  const [prescriptions, setPrescriptions] = useState(uniquePrescriptions);

  const persist = (items) => {
    setPrescriptions(items);
    localStorage.setItem("prescriptions", JSON.stringify(items));
  };

  const updateStatus = (id, status) => {
    const updated = prescriptions.map((item) => item.id === id ? { ...item, status } : item);
    persist(updated);
    const notifications = JSON.parse(localStorage.getItem("pharmacistNotifications")) || [];
    notifications.unshift({ id: Date.now(), title: `Prescription ${status}`, message: `Prescription ${id} has been marked as ${status}.`, read: false, createdAt: new Date().toLocaleString() });
    localStorage.setItem("pharmacistNotifications", JSON.stringify(notifications));
  };

  return (
    <div className="pharmacist-page">
      <h1>E-Prescription Management</h1>
      <div className="pharmacist-section"><p>Review electronic prescriptions, verify medication details, and complete pharmacist validation before dispensing.</p></div>
      <div className="pharmacist-section">
        {prescriptions.length === 0 ? <p className="pharmacist-empty">No electronic prescriptions are available.</p> : (
          <table className="pharmacist-table">
            <thead><tr><th>Patient</th><th>Doctor</th><th>Diagnosis</th><th>Medicines</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>{prescriptions.map((item) => (
              <tr key={item.id}>
                <td>{item.patientName}</td><td>{item.doctor}</td><td>{item.diagnosis}</td><td>{item.medicines.map((medicine) => medicine.name).filter(Boolean).join(", ") || "Not listed"}</td>
                <td><span className={`pharmacist-badge ${item.status === "pending" ? "warning" : ""}`}>{item.status}</span></td>
                <td><div className="pharmacist-actions"><button className="pharmacist-btn" onClick={() => updateStatus(item.id, "validated")}>Validate</button><button className="pharmacist-btn secondary" onClick={() => updateStatus(item.id, "dispensed")}>Dispense</button><button className="pharmacist-btn ghost" onClick={() => updateStatus(item.id, "on hold")}>Hold</button></div></td>
              </tr>
            ))}</tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EPrescriptionManagement;
