


//package com.medicloud.medicalrecords.controller;
//
//import com.medicloud.medicalrecords.model.User;
//import com.medicloud.medicalrecords.model.Role;
//import com.medicloud.medicalrecords.repository.UserRepository;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/admin")
//@PreAuthorize("hasRole('ADMIN')") // Strictly for superadmin
//public class AdminController {
//
//    private final UserRepository userRepository;
//    private final PasswordEncoder encoder;
//
//    public AdminController(UserRepository userRepository, PasswordEncoder encoder) {
//        this.userRepository = userRepository;
//        this.encoder = encoder;
//    }
//
//    // Endpoint to register ANY user (Doctor or Patient)
//    @PostMapping("/register")
//    public String registerUser(@RequestBody User newUser) {
//        if (userRepository.findByUsername(newUser.getUsername()).isPresent()) {
//            return "Error: Username already exists!";
//        }
//
//        // Encode the password before saving
//        newUser.setPassword(encoder.encode(newUser.getPassword()));
//        userRepository.save(newUser);
//
//        return "User " + newUser.getUsername() + " created successfully with role " + newUser.getRole();
//    }
//}




package com.medicloud.medicalrecords.controller;

import com.medicloud.medicalrecords.model.*;
import com.medicloud.medicalrecords.repository.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    // 1. FIX: Declare the missing variable
    private final MedicalRecordRepository medicalRecordRepository;
    private final PasswordEncoder encoder;

    // 2. FIX: Add medicalRecordRepository to the constructor
    public AdminController(UserRepository userRepository,
                           PatientRepository patientRepository,
                           MedicalRecordRepository medicalRecordRepository,
                           PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.medicalRecordRepository = medicalRecordRepository; // 3. FIX: Initialize it
        this.encoder = encoder;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody User newUser) {
        if (userRepository.findByUsername(newUser.getUsername()).isPresent()) {
            return "Error: Username already exists!";
        }
        newUser.setPassword(encoder.encode(newUser.getPassword()));
        User savedUser = userRepository.save(newUser);

        if (newUser.getRole() == Role.ROLE_PATIENT) {
            Patient profile = new Patient();
            profile.setUser(savedUser);
            profile.setName(newUser.getUsername());
            patientRepository.save(profile);
            return "Patient account and profile created for: " + newUser.getUsername();
        }
        return "User " + newUser.getUsername() + " created successfully!";
    }

    @GetMapping("/dashboard-stats")
    public Map<String, Long> getSystemStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalPatients", patientRepository.count());
        // This line will now work perfectly
        stats.put("totalMedicalRecords", medicalRecordRepository.count());
        return stats;
    }
}