package com.medicurex.controller;

import com.medicurex.model.Appointment;
import com.medicurex.repository.AppointmentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" })
public class AppointmentController {

    private final AppointmentRepository repo;

    public AppointmentController(AppointmentRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public ResponseEntity<Appointment> book(@RequestBody Appointment appointment) {
        return ResponseEntity.ok(repo.save(appointment));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Appointment>> getByPatient(@PathVariable String patientId) {
        return ResponseEntity.ok(repo.findByPatientId(patientId));
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Appointment>> getByDoctor(@PathVariable String doctorId) {
        return ResponseEntity.ok(repo.findByDoctorId(doctorId));
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAll() {
        return ResponseEntity.ok(repo.findAll());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Map<String, Object>> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        return repo.findById(id).map(app -> {
            app.setStatus(body.get("status"));
            repo.save(app);
            return ResponseEntity.ok(Map.<String, Object>of("success", true, "status", app.getStatus()));
        }).orElse(ResponseEntity.notFound().build());
    }
}
