package com.medicloud.medicalrecords.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String specialization; // e.g., Cardiologist

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user; // Links to the login account
}