//package com.medicloud.medicalrecords.service;
//
//import com.medicloud.medicalrecords.model.User;
//import com.medicloud.medicalrecords.repository.UserRepository;
//import org.springframework.security.core.userdetails.*;
//import org.springframework.stereotype.Service;
//
//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//
//    private final UserRepository userRepository;
//
//    public CustomUserDetailsService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = userRepository.findByUsername(username)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
//
//        // DEBUG PRINTS: Check your IntelliJ console for these!
//        System.out.println("--- Login Attempt ---");
//        System.out.println("Username: " + username);
//        System.out.println("Stored Hash: " + user.getPassword());
//        System.out.println("Role: " + user.getRole().name());
//
//        return org.springframework.security.core.userdetails.User
//                .withUsername(user.getUsername())
//                .password(user.getPassword())
//                .roles(user.getRole().name().replace("ROLE_", ""))
//                .build();
//    }
//}


package com.medicloud.medicalrecords.service;

import com.medicloud.medicalrecords.model.User;
import com.medicloud.medicalrecords.repository.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        System.out.println("Login Attempt for: " + username);
        System.out.println("DB Hash: " + user.getPassword());

        // We use .authorities() to pass the exact role name (e.g., ROLE_PATIENT)
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .authorities(user.getRole().name())
                .build();
    }
}