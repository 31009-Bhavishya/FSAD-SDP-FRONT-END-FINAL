package com.medicurex.controller;

import com.medicurex.model.User;
import com.medicurex.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")

// ✅ UPDATED CORS (added React + Vite ports)
@CrossOrigin(origins = {
        "http://localhost:3000",  // React
        "http://localhost:5173",  // Vite
        "http://localhost:5174"
})

public class UserController {

    private final UserRepository repo;
    private final PasswordEncoder encoder;

    public UserController(UserRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    // 🔽 GET all users
    @GetMapping
    public ResponseEntity<List<User>> getAll() {
        List<User> users = repo.findAll();
        users.forEach(u -> u.setPassword(null)); // hide password
        return ResponseEntity.ok(users);
    }

    // 🔽 ADD user
    @PostMapping
    public ResponseEntity<Map<String, Object>> addUser(@RequestBody User user) {
        if (repo.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "Email already exists"));
        }

        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);

        return ResponseEntity.ok(
                Map.of("success", true, "message", "User added successfully")
        );
    }

    // 🔽 DELETE user
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repo.deleteById(id);

        return ResponseEntity.ok(
                Map.of("success", true, "message", "User removed")
        );
    }
}