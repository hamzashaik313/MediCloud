package com.medicloud.medicalrecords.activity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "activity_logs")
public class ActivityLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String role;

    private String action;

    private Long entityId; // recordId / userId (nullable)

    private LocalDateTime timestamp;

    public ActivityLog() {}

    public ActivityLog(String username, String role, String action, Long entityId) {
        this.username = username;
        this.role = role;
        this.action = action;
        this.entityId = entityId;
        this.timestamp = LocalDateTime.now();
    }

    // getters & setters

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }

    public String getAction() {
        return action;
    }

    public Long getEntityId() {
        return entityId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public void setEntityId(Long entityId) {
        this.entityId = entityId;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
