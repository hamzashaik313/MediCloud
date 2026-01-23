package com.medicloud.medicalrecords.controller;

import com.medicloud.medicalrecords.auth.dto.HospitalSignupRequest;
import com.medicloud.medicalrecords.model.*;
import com.medicloud.medicalrecords.repository.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hospitals")
public class HospitalController {

    private final HospitalRepository hospitalRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public HospitalController(HospitalRepository hospitalRepository,
                              UserRepository userRepository,
                              PasswordEncoder encoder) {
        this.hospitalRepository = hospitalRepository;
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    @PostMapping("/signup")
    public String signupHospital(@RequestBody HospitalSignupRequest req) {

        // Create Hospital
        Hospital hospital = new Hospital();
        hospital.setName(req.getHospitalName());
        hospital.setCity(req.getCity());
        hospital.setLicenseCode(req.getLicenseCode());

        Hospital savedHospital = hospitalRepository.save(hospital);

        // Create Hospital Admin
        User admin = new User();
        admin.setUsername(req.getAdminUsername());
        admin.setPassword(encoder.encode(req.getAdminPassword()));
        admin.setRole(Role.ROLE_ADMIN);
        admin.setHospital(savedHospital);

        userRepository.save(admin);

        return "Hospital registered successfully";
    }
}
