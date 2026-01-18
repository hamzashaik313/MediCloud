package com.medicloud.medicalrecords.activity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ActivityLogQueryService {

    private final ActivityLogRepository repository;

    public ActivityLogQueryService(ActivityLogRepository repository) {
        this.repository = repository;
    }

    public Page<ActivityLog> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Page<ActivityLog> getByUsername(String username, Pageable pageable) {
        return repository.findByUsername(username, pageable);
    }

    public Page<ActivityLog> getByAction(String action, Pageable pageable) {
        return repository.findByAction(action, pageable);
    }

    public Page<ActivityLog> getByRole(String role, Pageable pageable) {
        return repository.findByRole(role, pageable);
    }
}
