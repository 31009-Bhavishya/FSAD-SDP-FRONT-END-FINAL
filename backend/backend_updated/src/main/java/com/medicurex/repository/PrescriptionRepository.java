package com.medicurex.repository;

import com.medicurex.model.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    List<Prescription> findByPatientName(String patientName);
    List<Prescription> findByDoctor(String doctor);
}
