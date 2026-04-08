package com.medicurex.controller;

import com.medicurex.model.Prescription;
import com.medicurex.repository.PrescriptionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/prescriptions")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" })
public class PrescriptionController {

    private final PrescriptionRepository repo;

    public PrescriptionController(PrescriptionRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public ResponseEntity<Prescription> create(@RequestBody Prescription prescription) {
        return ResponseEntity.ok(repo.save(prescription));
    }

    @GetMapping
    public ResponseEntity<List<Prescription>> getAll() {
        return ResponseEntity.ok(repo.findAll());
    }

    @GetMapping("/patient/{patientName}")
    public ResponseEntity<List<Prescription>> getByPatient(@PathVariable String patientName) {
        return ResponseEntity.ok(repo.findByPatientName(patientName));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Map<String, Object>> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        return repo.findById(id).map(p -> {
            p.setStatus(body.get("status"));
            repo.save(p);
            return ResponseEntity.ok(Map.<String, Object>of("success", true));
        }).orElse(ResponseEntity.notFound().build());
    }
}
