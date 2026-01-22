

//package com.medicloud.medicalrecords.repository;
//
//import com.medicloud.medicalrecords.model.Patient;
//import com.medicloud.medicalrecords.model.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//import java.util.List;
//import java.util.Optional;
//
//public interface PatientRepository extends JpaRepository<Patient, Long> {
//    // Allows searching for names like "John" or "Johnny"
//    List<Patient> findByNameContainingIgnoreCase(String name);
//    Optional<Patient> findByUser(User user);
//}
//

//UID


package com.medicloud.medicalrecords.repository;

import com.medicloud.medicalrecords.model.Patient;
import com.medicloud.medicalrecords.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    List<Patient> findByNameContainingIgnoreCase(String name);

    Optional<Patient> findByUser(User user);

    Optional<Patient> findByHealthId(String healthId);

    // ✅ Global search: Name OR Health ID
    List<Patient> findByNameContainingIgnoreCaseOrHealthIdContainingIgnoreCase(
            String name,
            String healthId
    );
}
