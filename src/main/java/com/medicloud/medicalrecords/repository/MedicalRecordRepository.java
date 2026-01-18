// Inside MedicalRecordRepository.java
//package com.medicloud.medicalrecords.repository;
//
//import com.medicloud.medicalrecords.model.MedicalRecord;
//import org.springframework.data.jpa.repository.JpaRepository;
//import java.util.List;
//
//public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {
//    List<MedicalRecord> findByPatientId(Long patientId); // Spring Data JPA creates the query for you
//}

package com.medicloud.medicalrecords.repository;

import com.medicloud.medicalrecords.model.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {
    List<MedicalRecord> findByPatientId(Long patientId);

    // Find records uploaded by a specific doctor/admin
    List<MedicalRecord> findByUploadedBy(String username);
}