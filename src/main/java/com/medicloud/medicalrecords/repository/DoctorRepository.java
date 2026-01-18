package com.medicloud.medicalrecords.repository;

import com.medicloud.medicalrecords.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByUserId(Long userId);

    // Allows patients to find all "Cardiologists" or "Neurologists"
    List<Doctor> findBySpecializationContainingIgnoreCase(String specialty);
}