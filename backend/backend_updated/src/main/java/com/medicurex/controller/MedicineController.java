package com.medicurex.controller;

import com.medicurex.model.Medicine;
import com.medicurex.repository.MedicineRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class MedicineController {

    private final MedicineRepository repo;

    public MedicineController(MedicineRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public ResponseEntity<List<Medicine>> getAll() {
        return ResponseEntity.ok(repo.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getById(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Medicine> create(@RequestBody Medicine medicine) {
        Medicine saved = repo.save(medicine);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Medicine> update(@PathVariable Long id, @RequestBody Medicine medicine) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        medicine.setId(id);
        return ResponseEntity.ok(repo.save(medicine));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.ok(Map.of("success", true, "message", "Medicine deleted"));
    }

    @PatchMapping("/{id}/stock")
    public ResponseEntity<Medicine> updateStock(@PathVariable Long id, @RequestBody Map<String, Integer> body) {
        return repo.findById(id).map(medicine -> {
            int delta = body.getOrDefault("delta", 0);
            int newStock = Math.max(0, (medicine.getStock() != null ? medicine.getStock() : 0) + delta);
            medicine.setStock(newStock);
            return ResponseEntity.ok(repo.save(medicine));
        }).orElse(ResponseEntity.notFound().build());
    }
}
