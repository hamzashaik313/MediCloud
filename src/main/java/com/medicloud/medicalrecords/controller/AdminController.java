

package com.medicloud.medicalrecords.controller;

import com.medicloud.medicalrecords.model.*;
import com.medicloud.medicalrecords.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final MedicalRecordRepository medicalRecordRepository;
    private final PasswordEncoder encoder;

    public AdminController(
            UserRepository userRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository,
            MedicalRecordRepository medicalRecordRepository,
            PasswordEncoder encoder
    ) {
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.medicalRecordRepository = medicalRecordRepository;
        this.encoder = encoder;
    }

    // ================= REGISTER USER / PATIENT =================
//    @PostMapping("/register")
//    public String registerUser(@RequestBody User newUser) {
//
//        if (userRepository.findByUsername(newUser.getUsername()).isPresent()) {
//            return "Username already exists";
//        }
//
//        newUser.setPassword(encoder.encode(newUser.getPassword()));
//        newUser.setActive(true);
//
//        User savedUser = userRepository.save(newUser);
//
//        if (newUser.getRole() == Role.ROLE_PATIENT) {
//            Patient patient = new Patient();
//            patient.setUser(savedUser);
//            patient.setName(savedUser.getUsername());
//            patientRepository.save(patient);
//        }
//
//        return "User created successfully";
//    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User newUser) {

        if (userRepository.findByUsername(newUser.getUsername()).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Username already exists");
        }

        newUser.setPassword(encoder.encode(newUser.getPassword()));
        newUser.setActive(true);

        User savedUser = userRepository.save(newUser);

        if (newUser.getRole() == Role.ROLE_PATIENT) {
            Patient patient = new Patient();
            patient.setUser(savedUser);
            patient.setName(savedUser.getUsername());
            patientRepository.save(patient);
        }

        return ResponseEntity.ok("User registered successfully");
    }


    // ================= REGISTER DOCTOR =================
    @PostMapping("/register-doctor")
    public String registerDoctor(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String specialty
    ) {
        if (userRepository.findByUsername(username).isPresent()) {
            return "Username already exists";
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(encoder.encode(password));
        user.setRole(Role.ROLE_DOCTOR);
        user.setActive(true);

        User savedUser = userRepository.save(user);

        Doctor doctor = new Doctor();
        doctor.setUser(savedUser);
        doctor.setName(username);
        doctor.setSpecialization(specialty);

        doctorRepository.save(doctor);

        return "Doctor registered successfully";
    }

    // ================= DASHBOARD STATS =================
    @GetMapping("/dashboard-stats")
    public Map<String, Long> dashboardStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalPatients", patientRepository.count());
        stats.put("totalDoctors", doctorRepository.count());
        stats.put("totalMedicalRecords", medicalRecordRepository.count());
        return stats;
    }

//    // ================= GET ALL USERS =================
//    @GetMapping("/users")
//    public List<User> getAllUsers() {
//        return userRepository.findAll();
//    }

    @GetMapping("/users")
    public Page<User> getAllUsers(
            @RequestParam(required = false) String username,
            @RequestParam(required = false) Role role,
            Pageable pageable
    ) {
        if (username != null && role != null) {
            return userRepository
                    .findByUsernameContainingIgnoreCaseAndRole(
                            username, role, pageable
                    );
        }

        if (username != null) {
            return userRepository
                    .findByUsernameContainingIgnoreCase(username, pageable);
        }

        if (role != null) {
            return userRepository.findByRole(role, pageable);
        }

        return userRepository.findAll(pageable);
    }

    // ================= ENABLE / DISABLE USER =================
    @PutMapping("/users/{id}/toggle")
    public void toggleUser(@PathVariable Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setActive(!user.isActive());
        userRepository.save(user);
    }


    @GetMapping("/doctors")
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }
    @GetMapping("/patients")
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }


}


