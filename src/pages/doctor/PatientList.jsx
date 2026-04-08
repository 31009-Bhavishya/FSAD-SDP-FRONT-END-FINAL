import React from "react";
import "./DoctorDashboard.css";

const PatientList = () => {
  const doctor = JSON.parse(localStorage.getItem("currentUser")) || {};
  const allAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

  // Get patients who have booked appointments with this doctor
  const doctorAppointments = allAppointments.filter(
    (app) =>
      app.doctorId === doctor.id ||
      app.doctorId === doctor.userId ||
      app.doctorUserId === doctor.id ||
      app.doctorUserId === doctor.userId
  );

  // Deduplicate by patientId
  const patientMap = new Map();
  doctorAppointments.forEach((app) => {
    if (app.patientId && !patientMap.has(app.patientId)) {
      patientMap.set(app.patientId, {
        id: app.patientId,
        name: app.patientName,
        age: app.patientAge,
        appointments: [],
      });
    }
    if (app.patientId && patientMap.has(app.patientId)) {
      patientMap.get(app.patientId).appointments.push(app);
    }
  });

  const patients = Array.from(patientMap.values());

  return (
    <div className="doctor-dashboard no-sidebar">
      <main className="main-content">
        <h1>My Patients</h1>
        <p className="subtitle">Patients who have booked appointments with you</p>

        {patients.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p style={{ opacity: 0.7, fontSize: "16px" }}>
              No patients yet. Once patients book appointments, they will appear here.
            </p>
          </div>
        ) : (
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Patient Name</th>
                  <th>Age</th>
                  <th>Total Appointments</th>
                  <th>Last Status</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => {
                  const latest = patient.appointments[patient.appointments.length - 1];
                  return (
                    <tr key={patient.id}>
                      <td>{index + 1}</td>
                      <td>{patient.name}</td>
                      <td>{patient.age || "N/A"}</td>
                      <td>{patient.appointments.length}</td>
                      <td>
                        <span className={`status ${latest?.status || "pending"}`}>
                          {latest?.status || "pending"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default PatientList;
