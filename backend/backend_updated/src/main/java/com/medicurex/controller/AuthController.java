package com.medicurex.controller;

import com.medicurex.model.User;
import com.medicurex.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
	    "http://localhost:5173",
	    "http://localhost:5174"
	})
public class AuthController {

    private final UserRepository repo;
    private final PasswordEncoder encoder;

    public AuthController(UserRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();

        if (repo.findByEmail(user.getEmail()).isPresent()) {
            response.put("success", false);
            response.put("message", "Email already registered. Please use a different email or login.");
            return ResponseEntity.badRequest().body(response);
        }

        user.setPassword(encoder.encode(user.getPassword()));
        User saved = repo.save(user);

        response.put("success", true);
        response.put("message", "Registration Successful! You can now Login to MediCurex");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        try {
            User dbUser = repo.findByEmail(user.getEmail()).orElse(null);

            if (dbUser == null) {
                response.put("success", false);
                response.put("message", "Invalid email or password");
                return ResponseEntity.status(401).body(response);
            }

            if (!encoder.matches(user.getPassword(), dbUser.getPassword())) {
                response.put("success", false);
                response.put("message", "Invalid email or password");
                return ResponseEntity.status(401).body(response);
            }

            // Return user info (never return the password)
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", dbUser.getId());
            userData.put("name", dbUser.getName());
            userData.put("email", dbUser.getEmail());
            userData.put("role", dbUser.getRole());

            response.put("success", true);
            response.put("message", "Login Successful! Welcome to MediCurex");
            response.put("user", userData);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "Server error: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}
