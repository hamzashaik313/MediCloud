package com.medicloud.medicalrecords.controller;

import com.medicloud.medicalrecords.model.User;
import com.medicloud.medicalrecords.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public UserController(UserRepository userRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    @PutMapping("/change-password")
    public String changePassword(@RequestBody Map<String, String> passwords, Principal principal) {
        String username = principal.getName();
        String newPassword = passwords.get("newPassword");

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Encode the new password before saving it to MySQL
        user.setPassword(encoder.encode(newPassword));
        userRepository.save(user);

        return "Password updated successfully for user: " + username;
    }
}