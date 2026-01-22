//
//
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
//        // 1. Create Superadmin (System Manager)
//        if (userRepository.findByUsername("superadmin").isEmpty()) {
//            User u = new User();
//            u.setUsername("superadmin");
//            u.setPassword(encoder.encode("Med@2026"));
//            u.setRole(Role.ROLE_ADMIN);
//            userRepository.save(u);
//        }
//
//        // 2. Create a Patient User with a linked Profile
//        if (userRepository.findByUsername("patient1").isEmpty()) {
//            User user = new User();
//            user.setUsername("patient1");
//            user.setPassword(encoder.encode("pass123"));
//            user.setRole(Role.ROLE_PATIENT);
//
//            Patient profile = new Patient();
//            profile.setName("John Doe");
//            profile.setAge(30);
//            profile.setGender("Male");
//            profile.setDisease("General Checkup");
//
//            // Link the two-way relationship
//            profile.setUser(user);
//            user.setPatient(profile);
//
//            userRepository.save(user); // Saving User will save Patient due to CascadeType.ALL
//        }
//    }
//}



package com.medicloud.medicalrecords.config;

import com.medicloud.medicalrecords.model.*;
import com.medicloud.medicalrecords.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    @PostConstruct
    public void init() {
        // FORCE RESET patient1 to ensure the hash matches the encoder 100%
        userRepository.findByUsername("patient1").ifPresent(user -> {
            user.setPassword(encoder.encode("pass123"));
            userRepository.save(user);
            System.out.println("--- ALERT: PATIENT1 PASSWORD RE-ENCODED SUCCESSFULLY ---");
        });


        if (userRepository.findByUsername("superadmin").isEmpty()) {
            User u = new User();
            u.setUsername("superadmin");
            u.setPassword(encoder.encode("Med@2026"));
            u.setRole(Role.ROLE_ADMIN);
            userRepository.save(u);
        }
    }
}