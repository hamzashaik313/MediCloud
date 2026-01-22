


//package com.medicloud.medicalrecords.config;
//
//import com.medicloud.medicalrecords.model.*;
//import com.medicloud.medicalrecords.repository.UserRepository;
//import jakarta.annotation.PostConstruct;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//@Component
//public class DataInitializer {
//
//    private final UserRepository userRepository;
//    private final PasswordEncoder encoder;
//
//    public DataInitializer(UserRepository userRepository, PasswordEncoder encoder) {
//        this.userRepository = userRepository;
//        this.encoder = encoder;
//    }
//
//    @PostConstruct
//    public void init() {
//        // FORCE RESET patient1 to ensure the hash matches the encoder 100%
//        userRepository.findByUsername("patient1").ifPresent(user -> {
//            user.setPassword(encoder.encode("pass123"));
//            userRepository.save(user);
//            System.out.println("--- ALERT: PATIENT1 PASSWORD RE-ENCODED SUCCESSFULLY ---");
//        });
//
//
//        if (userRepository.findByUsername("superadmin").isEmpty()) {
//            User u = new User();
//            u.setUsername("superadmin");
//            u.setPassword(encoder.encode("Med@2026"));
//            u.setRole(Role.ROLE_ADMIN);
//            userRepository.save(u);
//        }
//    }
//}

//uid


package com.medicloud.medicalrecords.config;

import com.medicloud.medicalrecords.model.Patient;
import com.medicloud.medicalrecords.model.Role;
import com.medicloud.medicalrecords.model.User;
import com.medicloud.medicalrecords.repository.PatientRepository;
import com.medicloud.medicalrecords.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class DataInitializer {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final PasswordEncoder encoder;


//    public DataInitializer(UserRepository userRepository,
//                           PatientRepository patientRepository,
//                           PasswordEncoder encoder) {
//        this.userRepository = userRepository;
//        this.patientRepository = patientRepository;
//        this.encoder = encoder;
//    }
    public DataInitializer(UserRepository userRepository, PasswordEncoder encoder, PatientRepository patientRepository) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.patientRepository = patientRepository;
    }

    @PostConstruct
    public void init() {

        // Reset patient1 password
        userRepository.findByUsername("patient1").ifPresent(user -> {
            user.setPassword(encoder.encode("pass123"));
            userRepository.save(user);
        });

        // Ensure Super Admin
        if (userRepository.findByUsername("superadmin").isEmpty()) {
            User u = new User();
            u.setUsername("superadmin");
            u.setPassword(encoder.encode("Med@2026"));
            u.setRole(Role.ROLE_ADMIN);
            userRepository.save(u);
        }

        // 🔥 AUTO-GENERATE HEALTH IDS
        patientRepository.findAll().forEach(patient -> {
            if (patient.getHealthId() == null || patient.getHealthId().isEmpty()) {
                String id = "HID-" + UUID.randomUUID().toString().substring(0, 8);
                patient.setHealthId(id);
                patientRepository.save(patient);
                System.out.println("Assigned Health ID: " + id + " -> " + patient.getName());
            }
        });
    }
}
