package com.medicloud.medicalrecords.auth;

import com.medicloud.medicalrecords.activity.ActivityLogService;
import com.medicloud.medicalrecords.auth.dto.LoginRequest;
import com.medicloud.medicalrecords.auth.dto.LoginResponse;
import com.medicloud.medicalrecords.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;
import com.medicloud.medicalrecords.auth.dto.PatientRegisterRequest;
import com.medicloud.medicalrecords.model.Patient;
import com.medicloud.medicalrecords.model.Role;
import com.medicloud.medicalrecords.model.User;
import com.medicloud.medicalrecords.repository.PatientRepository;
import com.medicloud.medicalrecords.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private ActivityLogService activityLogService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;



    @Autowired
    private JwtUtil jwtUtil;

//    @PostMapping("/login")
//    public LoginResponse login(@RequestBody LoginRequest request) {
//
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        request.getUsername(),
//                        request.getPassword()
//                )
//        );
//
//        String role = authentication.getAuthorities()
//                .stream()
//                .findFirst()
//                .map(a -> a.getAuthority())
//                .orElse("ROLE_USER");
//
//        String token = jwtUtil.generateToken(
//                authentication.getName(),
//                role
//        );
//
//        // LOG LOGIN
//        activityLogService.logManual(
//                authentication.getName(),
//                role,
//                "LOGIN",
//                null
//        );
//
//
//        return new LoginResponse(token);
//    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        String role = authentication.getAuthorities()
                .stream()
                .findFirst()
                .map(a -> a.getAuthority())
                .orElse("ROLE_USER");

        String token = jwtUtil.generateToken(
                authentication.getName(),
                role
        );

        activityLogService.logManual(
                authentication.getName(),
                role,
                "LOGIN",
                null
        );

        // ✅ THIS IS THE FIX
        return new LoginResponse(token, role);
    }

    @PostMapping("/register-patient")
    public ResponseEntity<String> registerPatient(
            @RequestBody PatientRegisterRequest request
    ) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body("Username already exists");
        }

        // 1️⃣ Create USER (Security)
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.ROLE_PATIENT);

        User savedUser = userRepository.save(user);

        // 2️⃣ Create PATIENT profile (Business)
        Patient patient = new Patient();
        patient.setUser(savedUser);
        patient.setName(request.getUsername());

        patientRepository.save(patient);

        return ResponseEntity.ok("Patient registered successfully");
    }
}
