package com.medicurex.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patientName;
    private String doctor;
    private String diagnosis;
    private String date;
    private String status; // pending, validated, dispensed, on hold

    @Column(columnDefinition = "TEXT")
    private String medicinesJson; // JSON string of medicine list

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() { createdAt = LocalDateTime.now(); if (status == null) status = "pending"; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }
    public String getDoctor() { return doctor; }
    public void setDoctor(String doctor) { this.doctor = doctor; }
    public String getDiagnosis() { return diagnosis; }
    public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getMedicinesJson() { return medicinesJson; }
    public void setMedicinesJson(String medicinesJson) { this.medicinesJson = medicinesJson; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
