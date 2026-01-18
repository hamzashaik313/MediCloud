package com.medicloud.medicalrecords.activity;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class ActivityLogService {

    private final ActivityLogRepository repository;

    public ActivityLogService(ActivityLogRepository repository) {
        this.repository = repository;
    }

    public void log(String action, Long entityId) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return; // safety check
        }

        String username = authentication.getName();
        String role = authentication.getAuthorities()
                .stream()
                .findFirst()
                .map(a -> a.getAuthority())
                .orElse("UNKNOWN");

        ActivityLog log = new ActivityLog(
                username,
                role,
                action,
                entityId
        );

        repository.save(log);
    }
    public void logManual(String username, String role, String action, Long entityId) {

        ActivityLog log = new ActivityLog(
                username,
                role,
                action,
                entityId
        );

        repository.save(log);
    }


}
