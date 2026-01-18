//
//
//package com.medicloud.medicalrecords.repository;
//
//
//
//import com.medicloud.medicalrecords.model.Patient;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//public interface PatientRepository extends JpaRepository<Patient, Long> {}

package com.medicloud.medicalrecords.repository;

import com.medicloud.medicalrecords.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    // Allows searching for names like "John" or "Johnny"
    List<Patient> findByNameContainingIgnoreCase(String name);
}