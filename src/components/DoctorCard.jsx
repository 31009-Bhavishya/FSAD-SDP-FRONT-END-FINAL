import React from "react";

const DoctorCard = ({ doctor, onSelect }) => {
  return (
    <div className="doctor-card" style={{
      background: "#fff",
      borderRadius: "12px",
      padding: "20px",
      textAlign: "center",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      cursor: "pointer",
      transition: "transform 0.2s",
    }}
    onClick={() => onSelect && onSelect(doctor)}
    >
      {doctor.image ? (
        <img
          src={doctor.image}
          alt={doctor.name}
          style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", marginBottom: "12px" }}
        />
      ) : (
        <div style={{
          width: "80px", height: "80px", borderRadius: "50%",
          background: "#0ea5e9", color: "#fff", fontSize: "28px",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 12px",
        }}>
          {doctor.name?.charAt(0) || "D"}
        </div>
      )}
      <h3 style={{ margin: "0 0 4px", fontSize: "16px" }}>{doctor.name}</h3>
      <p style={{ color: "#0ea5e9", fontSize: "13px", margin: "0 0 4px" }}>{doctor.specialization}</p>
      <p style={{ fontSize: "12px", color: "#666", margin: "0 0 4px" }}>Experience: {doctor.experience}</p>
      <p style={{ fontSize: "13px", fontWeight: "bold", color: "#334155" }}>₹{doctor.fee}</p>
      {onSelect && (
        <button style={{
          marginTop: "10px", padding: "8px 18px",
          background: "#0ea5e9", color: "#fff", border: "none",
          borderRadius: "8px", cursor: "pointer", fontSize: "13px",
        }}>
          Book Appointment
        </button>
      )}
    </div>
  );
};

export default DoctorCard;
