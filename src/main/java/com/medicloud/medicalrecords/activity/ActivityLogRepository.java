package com.medicloud.medicalrecords.activity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {

    Page<ActivityLog> findByUsername(String username, Pageable pageable);

    Page<ActivityLog> findByAction(String action, Pageable pageable);

    Page<ActivityLog> findByRole(String role, Pageable pageable);
}
