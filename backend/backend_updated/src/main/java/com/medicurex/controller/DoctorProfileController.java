package com.medicurex.controller;

import com.medicurex.model.DoctorProfile;
import com.medicurex.model.User;
import com.medicurex.repository.DoctorProfileRepository;
import com.medicurex.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" })
public class DoctorProfileController {

    private final DoctorProfileRepository profileRepo;
    private final UserRepository userRepo;

    public DoctorProfileController(DoctorProfileRepository profileRepo, UserRepository userRepo) {
        this.profileRepo = profileRepo;
        this.userRepo = userRepo;
    }

    // Save or update doctor profile (onboarding)
    @PostMapping("/profile")
    public ResponseEntity<Map<String, Object>> saveProfile(@RequestBody DoctorProfile profile) {
        Optional<DoctorProfile> existing = profileRepo.findByUserId(profile.getUserId());
        if (existing.isPresent()) {
            DoctorProfile p = existing.get();
            p.setName(profile.getName());
            p.setEmail(profile.getEmail());
            p.setSpecialization(profile.getSpecialization());
            p.setExperience(profile.getExperience());
            p.setFee(profile.getFee());
            p.setTimeSlots(profile.getTimeSlots());
            p.setImage(profile.getImage());
            profileRepo.save(p);
        } else {
            profileRepo.save(profile);
        }

        // Mark user as profileCompleted
        userRepo.findById(Long.parseLong(profile.getUserId())).ifPresent(u -> {
            u.setProfileCompleted(true);
            userRepo.save(u);
        });

        return ResponseEntity.ok(Map.of("success", true, "message", "Profile saved successfully"));
    }

    // Get profile by userId
    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable String userId) {
        return profileRepo.findByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get all doctor profiles (for patient booking)
    @GetMapping
    public ResponseEntity<List<DoctorProfile>> getAllDoctors() {
        return ResponseEntity.ok(profileRepo.findAll());
    }
}
