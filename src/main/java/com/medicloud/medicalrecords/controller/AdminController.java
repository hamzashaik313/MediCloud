//
//package com.medicloud.medicalrecords.controller;
//
//import com.medicloud.medicalrecords.model.*;
//import com.medicloud.medicalrecords.repository.*;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/admin")
//@PreAuthorize("hasRole('ADMIN')")
//public class AdminController {
//
//    private final UserRepository userRepository;
//    private final PatientRepository patientRepository;
//    // 1. FIX: Declare the missing variable
//    private final MedicalRecordRepository medicalRecordRepository;
//    private final PasswordEncoder encoder;
//
//    // 2. FIX: Add medicalRecordRepository to the constructor
//    public AdminController(UserRepository userRepository,
//                           PatientRepository patientRepository,
//                           MedicalRecordRepository medicalRecordRepository,
//                           PasswordEncoder encoder) {
//        this.userRepository = userRepository;
//        this.patientRepository = patientRepository;
//        this.medicalRecordRepository = medicalRecordRepository; // 3. FIX: Initialize it
//        this.encoder = encoder;
//    }
//
//    @PostMapping("/register")
//    public String registerUser(@RequestBody User newUser) {
//        if (userRepository.findByUsername(newUser.getUsername()).isPresent()) {
//            return "Error: Username already exists!";
//        }
//        newUser.setPassword(encoder.encode(newUser.getPassword()));
//        User savedUser = userRepository.save(newUser);
//
//        if (newUser.getRole() == Role.ROLE_PATIENT) {
//            Patient profile = new Patient();
//            profile.setUser(savedUser);
//            profile.setName(newUser.getUsername());
//            patientRepository.save(profile);
//            return "Patient account and profile created for: " + newUser.getUsername();
//        }
//        return "User " + newUser.getUsername() + " created successfully!";
//    }
//
//    @GetMapping("/dashboard-stats")
//    public Map<String, Long> getSystemStats() {
//        Map<String, Long> stats = new HashMap<>();
//        stats.put("totalUsers", userRepository.count());
//        stats.put("totalPatients", patientRepository.count());
//        // This line will now work perfectly
//        stats.put("totalMedicalRecords", medicalRecordRepository.count());
//        return stats;
//    }
//
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
    private final MedicalRecordRepository medicalRecordRepository;
    private final DoctorRepository doctorRepository; // Added for Specialization
    private final PasswordEncoder encoder;

    public AdminController(UserRepository userRepository,
                           PatientRepository patientRepository,
                           MedicalRecordRepository medicalRecordRepository,
                           DoctorRepository doctorRepository, // Added to constructor
                           PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.medicalRecordRepository = medicalRecordRepository;
        this.doctorRepository = doctorRepository;
        this.encoder = encoder;
    }

    /**
     * Standard registration for Users and Patients.
     */
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

    /**
     * New Specialized Registration for Doctors.
     * Use this to assign specialties like Cardiology or Neurology.
     */
    @PostMapping("/register-doctor")
    public String registerDoctor(@RequestParam String username,
                                 @RequestParam String password,
                                 @RequestParam String specialty) {
        if (userRepository.findByUsername(username).isPresent()) {
            return "Error: Username already exists!";
        }

        // 1. Create the base User account with ROLE_DOCTOR
        User user = new User();
        user.setUsername(username);
        user.setPassword(encoder.encode(password));
        user.setRole(Role.ROLE_DOCTOR);
        User savedUser = userRepository.save(user);

        // 2. Create the Doctor Profile with their Specialty
        Doctor doctor = new Doctor();
        doctor.setUser(savedUser);
        doctor.setName(username);
        doctor.setSpecialization(specialty);
        doctorRepository.save(doctor);

        return "Doctor " + username + " registered successfully as a " + specialty + "!";
    }

    /**
     * Dashboard statistics for the Admin view.
     */
    @GetMapping("/dashboard-stats")
    public Map<String, Long> getSystemStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalPatients", patientRepository.count());
        stats.put("totalDoctors", doctorRepository.count()); // Added doctor count
        stats.put("totalMedicalRecords", medicalRecordRepository.count());
        return stats;
    }
}