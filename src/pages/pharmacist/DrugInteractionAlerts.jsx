import React, { useState } from "react";
import "./PharmacistDashboard.css";

const seedAlerts = [
  { id: 1, title: "Potential interaction detected", message: "Amoxicillin and methotrexate require pharmacist review before dispense.", severity: "High" },
  { id: 2, title: "Duplicate therapy warning", message: "Two NSAID medicines appear in the same prescription. Confirm clinical intent.", severity: "Medium" },
];

const DrugInteractionAlerts = () => {
  const [alerts] = useState(JSON.parse(localStorage.getItem("drugInteractionAlerts")) || seedAlerts);
  localStorage.setItem("drugInteractionAlerts", JSON.stringify(alerts));
  return <div className="pharmacist-page"><h1>Drug Interaction Alerts</h1><div className="pharmacist-section"><ul className="pharmacist-list">{alerts.map((alert) => <li key={alert.id}><strong>{alert.title}</strong><div>{alert.message}</div><span className={`pharmacist-badge ${alert.severity === "High" ? "low" : "warning"}`}>{alert.severity} Severity</span></li>)}</ul></div></div>;
};

export default DrugInteractionAlerts;
